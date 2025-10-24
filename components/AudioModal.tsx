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
  closeAudioSheet?: () => void;
  onAttach?: (uri: string) => void;
  todoId: string;
}

const AudioRecorderScreen: React.FC<AudioRecorderProps> = ({
  onCancel,
  onAttach,
  closeAudioSheet,
  todoId,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [recordingUri, setRecordingUri] = useState<string>("");
  const [hasPermission, setHasPermission] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { addAttachment } = useCommentStore();

  useEffect(() => {
    (async () => {
      const granted = await requestPermissions();
      setHasPermission(granted);
    })();
  }, []);

  useEffect(() => {
    return () => {
      cleanupRecording();
    };
  }, []);

  const cleanupRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
      }
    } catch {}
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ✅ Request permissions (Android + Expo)
  const requestPermissions = async (): Promise<boolean> => {
    let androidGranted = true;

    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Audio Recording Permission",
          message: "This app needs access to your microphone to record audio.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      androidGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const { status: expoStatus } = await Audio.requestPermissionsAsync();
    return androidGranted && expoStatus === "granted";
  };

  // ✅ Start Recording
  const startRecording = async () => {
    if (!hasPermission) {
      Alert.alert("Permission denied", "Microphone permission is required");
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingOptions = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          meteringEnabled: true,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          meteringEnabled: true,
        },
      };

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
      setDuration(0);
      setAudioLevels([]);

      startTimerAndWaveform(newRecording);
    } catch (error) {
      console.error("Failed to start recording:", error);
      Alert.alert("Error", "Could not start recording");
    }
  };

  // ✅ Timer + Waveform
  const startTimerAndWaveform = (rec: Audio.Recording) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      const status = await rec.getStatusAsync();

      if (status.isRecording) {
        // sync actual duration
        setDuration(status.durationMillis / 1000);

        if (typeof status.metering === "number") {
          const level = Math.min(
            Math.max((status.metering + 160) / 1.6, 0),
            100
          );
          setAudioLevels((prev) => [...prev.slice(-50), level]);
        }
      }
    }, 1000);
  };

  // ✅ Stop Recording
  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const status = await recording.getStatusAsync();
      setDuration(status.durationMillis / 1000);
      const uri = recording.getURI();
      if (uri) setRecordingUri(uri);

      cleanupRecording();
      setIsRecording(false);
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  // ✅ Play Recording
  const playRecording = async () => {
    if (!recordingUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  };

  const retakeRecording = () => {
    cleanupRecording();
    setRecordingUri("");
    setDuration(0);
    setAudioLevels([]);
  };

  const handleCancel = () => {
    cleanupRecording();
    onCancel?.();
    closeAudioSheet?.();
  };

  const handleAttach = () => {
    if (recordingUri) {
      const fileName = `audio-${Date.now()}.m4a`;

      addAttachment(todoId, {
        uri: recordingUri,
        type: "audio",
        name: fileName,
        mimeType: "audio/m4a",
      });

      onAttach?.(recordingUri);
      closeAudioSheet?.();
      console.log("Audio attached:", recordingUri);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ✅ Waveform Renderer
  const renderWaveform = () => {
    const maxBars = Math.floor((width * 0.8) / 4);
    const bars = audioLevels.slice(-maxBars);

    return (
      <View style={styles.waveformContainer}>
        {Array.from({ length: maxBars }, (_, index) => {
          const level = bars[index] || 0;
          const height = Math.max(4, (level / 100) * 80);
          return (
            <View
              key={index}
              style={[
                styles.waveformBar,
                { height, opacity: bars[index] ? 1 : 0.3 },
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

      <Text style={styles.title}>Record Audio</Text>

      {/* Waveform */}
      <View style={styles.waveformWrapper}>{renderWaveform()}</View>

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

export default AudioRecorderScreen;

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
  headerButton: { padding: 10 },
  cancelText: { color: "#ff3333", fontSize: 16, fontWeight: "600" },
  attachText: { color: "#666", fontSize: 16, fontWeight: "600" },
  disabledText: { color: "#333" },
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
  waveformBar: { width: 2, backgroundColor: "#666", borderRadius: 1 },
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
  recordingActive: { borderColor: "#ff3333" },
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
  retakeButton: { padding: 20 },
  retakeText: { color: "#666", fontSize: 14, fontWeight: "600" },
});
