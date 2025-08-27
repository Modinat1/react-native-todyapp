import { Camera, Paper, Voice } from "@/assets";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MediaModalProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const MediaModal = ({ modalVisible, setModalVisible }: MediaModalProps) => {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [doc, setDoc] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // any type of file
        copyToCacheDirectory: true,
      });

      // Check if user didn't cancel and assets exist
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDoc(result.assets[0]); // save the first selected doc
      }
    } catch (error) {
      console.error("Document picking error:", error);
    }
  };

  const takePhoto = async () => {
    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Save photo URI
    }
  };

  // 🖼 Pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View className="bg-white rounded-2xl w-[90%] px-6 py-4 gap-5">
          <TouchableOpacity
            className="flex-row justify-end"
            onPress={() => setModalVisible(false)}
          >
            <AntDesign name="close" size={20} color="#A0AAB8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickDocument}
            className="flex-row gap-3 items-center"
          >
            <Paper />
            <Text className="text-primary text-base font-normal">
              File/Document
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            className="flex-row gap-3 items-center"
          >
            <Text>🖼</Text>

            <Text className="text-[#218EFD] text-base font-normal">
              Choose a Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={takePhoto}
            // onPress={() => router.push("/(main)/image-picker")}
            className="flex-row gap-3 items-center"
          >
            <Camera />
            <Text className="text-[#218EFD] text-base font-normal">
              Take a Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(main)/audio-recorder")}
            className="flex-row gap-3 items-center"
          >
            <Voice />
            <Text className="text-destructive text-base font-normal">
              Record Audio
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {image && (
          <Image
            source={{ uri: image }}
            className="w-[80%] mt-10 rounded-2xl"
          />
        )}
      </View>

      {doc && (
        <View>
          <Text>📄 File Name: {doc.name}</Text>
          <Text>📂 File Size: {doc.size} bytes</Text>
          <Text>📍 URI: {doc.uri}</Text>
          <Text>📑 Type: {doc.mimeType}</Text>
        </View>
      )}
    </Modal>
  );
};

export default MediaModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
