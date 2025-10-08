import useCommentStore from "@/store/features/useCommentStore";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface AudioRecorderProps {
  onCancel?: () => void;
  onAttachSuccess?: () => void;
  onAttach?: (uri: string) => void;
}

const AudioRecorderScreen: React.FC<AudioRecorderProps> = ({
  onCancel,
  onAttach,
  onAttachSuccess,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [recordingUri, setRecordingUri] = useState<string>("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioLevelRef = useRef<NodeJS.Timeout | null>(null);
  const { addAttachment } = useCommentStore();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioLevelRef.current) {
        clearInterval(audioLevelRef.current);
      }
    };
  }, [recording]);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Audio Recording Permission",
            message:
              "This app needs access to your microphone to record audio.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission denied",
          "Cannot record audio without microphone permission"
        );
        return;
      }

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      setDuration(0);
      setAudioLevels([]);

      // Start timer
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 0.01);
      }, 10);

      // Simulate audio levels for waveform
      audioLevelRef.current = setInterval(() => {
        const level = Math.random() * 100;
        setAudioLevels((prev) => [...prev.slice(-50), level]);
      }, 100);
    } catch (err) {
      console.error("Failed to start recording", err);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioLevelRef.current) {
        clearInterval(audioLevelRef.current);
      }

      const uri = recording.getURI();
      if (uri) {
        setRecordingUri(uri);
      }
      setRecording(null);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play recording", error);
    }
  };

  const retakeRecording = () => {
    setRecordingUri("");
    setDuration(0);
    setAudioLevels([]);
  };

  const handleCancel = () => {
    if (recording) {
      stopRecording();
    }
    onCancel?.();
  };

  const handleAttach = () => {
    if (recordingUri) {
      const fileName = `audio-${Date.now()}.m4a`;

      addAttachment({
        uri: recordingUri,
        type: "audio",
        name: fileName,
        mimeType: "audio/m4a",
      });

      onAttach?.(recordingUri);
      onAttachSuccess?.();
      console.log("Audio attached:", recordingUri);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centisecs = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${centisecs.toString().padStart(2, "0")}`;
  };

  const renderWaveform = () => {
    const maxBars = Math.floor((width * 0.8) / 4);
    const bars = audioLevels.slice(-maxBars);

    return (
      <View style={styles.waveformContainer}>
        {Array.from({ length: maxBars }, (_, index) => {
          const level = bars[index] || 0;
          const height = Math.max(4, (level / 100) * 60);
          return (
            <View
              key={index}
              style={[
                styles.waveformBar,
                {
                  height,
                  opacity: bars[index] ? 1 : 0.3,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
          <Text style={styles.cancelText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAttach}
          style={styles.headerButton}
          disabled={!recordingUri}
        >
          <Text
            style={[styles.attachText, !recordingUri && styles.disabledText]}
          >
            ATTACH
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Record Audio</Text>

      {/* Waveform */}
      <View style={styles.waveformWrapper}>{renderWaveform()}</View>

      {/* Timer */}
      <Text style={styles.timer}>{formatTime(duration)}</Text>

      {/* Controls */}
      <View style={styles.controls}>
        {recordingUri && (
          <TouchableOpacity onPress={playRecording} style={styles.playButton}>
            <View style={styles.playIcon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={[styles.recordButton, isRecording && styles.recordingActive]}
        >
          <View
            style={[
              styles.recordButtonInner,
              isRecording && styles.recordButtonInnerActive,
            ]}
          />
        </TouchableOpacity>

        {recordingUri && (
          <TouchableOpacity
            onPress={retakeRecording}
            style={styles.retakeButton}
          >
            <Text style={styles.retakeText}>RETAKE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight || 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerButton: {
    padding: 10,
  },
  cancelText: {
    color: "#ff3333",
    fontSize: 16,
    fontWeight: "600",
  },
  attachText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#333",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 60,
  },
  waveformWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    gap: 2,
  },
  waveformBar: {
    width: 2,
    backgroundColor: "#666",
    borderRadius: 1,
  },
  timer: {
    color: "#666",
    fontSize: 32,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 60,
    fontVariant: ["tabular-nums"],
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
    gap: 40,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 15,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#666",
    marginLeft: 4,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
  },
  recordingActive: {
    borderColor: "#ff3333",
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff3333",
  },
  recordButtonInnerActive: {
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  retakeButton: {
    padding: 20,
  },
  retakeText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AudioRecorderScreen;
