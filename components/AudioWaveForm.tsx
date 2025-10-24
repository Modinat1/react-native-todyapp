import { colors } from "@/colorSettings";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AudioWaveFormProps {
  audioUri: string;
}

const AudioWaveForm = ({ audioUri }: AudioWaveFormProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

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
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );

      soundRef.current = sound;
      // durationMillis exists only on the success playback status; guard before using it
      if (
        "durationMillis" in status &&
        typeof status.durationMillis === "number"
      ) {
        setDuration(status.durationMillis / 1000);
      } else {
        setDuration(0);
      }

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        setCurrentTime(status.positionMillis / 1000);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish) {
          setIsPlaying(false);
          setCurrentTime(0);
          // sound.setPositionAsync(0); // reset position
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
  };

  const togglePlay = async () => {
    try {
      if (!soundRef.current) return;

      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        // replay if ended
        const status = await soundRef.current.getStatusAsync();
        // ensure durationMillis is defined before comparing
        if (
          status.isLoaded &&
          typeof status.durationMillis === "number" &&
          typeof status.positionMillis === "number" &&
          status.positionMillis >= status.durationMillis
        ) {
          await soundRef.current.setPositionAsync(0);
        }

        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const seekToPosition = async (percentage: number) => {
    if (!soundRef.current || !duration) return;
    const position = percentage * duration * 1000;
    await soundRef.current.setPositionAsync(position);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
        <Text style={styles.playIcon}>
          {isPlaying ? (
            <AntDesign name="pause" size={18} color="white" />
          ) : (
            <Entypo name="controller-play" size={18} color="white" />
          )}
        </Text>
      </TouchableOpacity>

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

      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
    </View>
  );
};

export default AudioWaveForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#fff",
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
