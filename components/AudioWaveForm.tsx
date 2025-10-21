import { colors } from "@/colorSettings";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioWaveFormProps {
  audioUri: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AudioWaveForm = ({
  audioUri,
  isPlaying,
  setIsPlaying,
}: AudioWaveFormProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);
  const progressInterval = useRef(null);

  // Generate waveform heights (in production, analyze actual audio)
  const waveformBars = 50;
  const [waveformHeights] = useState(() =>
    Array.from({ length: waveformBars }, () => Math.random() * 0.7 + 0.3)
  );

  useEffect(() => {
    setupAudio();
    return () => {
      cleanupAudio();
    };
  }, []);

  const setupAudio = async () => {
    try {
      // For Expo
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );

      soundRef.current = sound;
      setDuration(status.durationMillis / 1000);

      // Listen to playback status updates
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          setIsPlaying(status.isPlaying);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        }
      });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const cleanupAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const togglePlay = async () => {
    try {
      if (!soundRef.current) return;

      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const seekToPosition = async (percentage) => {
    try {
      if (!soundRef.current || !duration) return;
      const position = percentage * duration * 1000; // Convert to milliseconds
      await soundRef.current.setPositionAsync(position);
    } catch (error) {
      console.error("Error seeking:", error);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      {/* <View style={styles.container}> */}
      {/* Play/Pause Button */}
      <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
        <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶"}</Text>
      </TouchableOpacity>

      {/* Waveform */}
      <View style={styles.waveformContainer}>
        {waveformHeights.map((height, i) => {
          const barProgress = i / waveformBars;
          const isActive = barProgress <= progress;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => seekToPosition(barProgress)}
              style={[
                styles.waveformBar,
                {
                  height: `${height * 100}%`,
                  backgroundColor: isActive
                    ? colors.primary.DEFAULT
                    : "#d1d5db",
                },
              ]}
              activeOpacity={0.7}
            />
          );
        })}
      </View>

      {/* Time Display */}
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
    </View>
  );
};

export default AudioWaveForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 5,
    gap: 12,
  },
  playButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 2,
  },
  waveformContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    gap: 2,
  },
  waveformBar: {
    flex: 1,
    borderRadius: 10,
    minWidth: 2,
  },
  timeText: {
    fontSize: 12,
    color: colors.primary.DEFAULT,
    fontWeight: "500",
    minWidth: 35,
  },
});
