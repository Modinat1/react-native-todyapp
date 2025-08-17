import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function VoiceTodo() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const sound = useRef<Audio.Sound | null>(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setAudioUri(uri || null);
  };

  const playSound = async () => {
    if (audioUri) {
      const { sound: playbackObject } = await Audio.Sound.createAsync({
        uri: audioUri,
      });
      sound.current = playbackObject;
      await playbackObject.playAsync();
    }
  };

  return (
    <View>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && (
        <View>
          <Text>Recorded Audio</Text>
          <Button title="Play" onPress={playSound} />
        </View>
      )}
    </View>
  );
}
