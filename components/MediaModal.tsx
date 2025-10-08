import { Camera, Paper, Voice } from "@/assets";
import { useBottomSheetStore } from "@/store/features/useBottomSheetStore";
import useCommentStore from "@/store/features/useCommentStore";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AudioModal from "./AudioModal";

interface MediaModalProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const MediaModal = ({ modalVisible, setModalVisible }: MediaModalProps) => {
  // const router = useRouter();
  const { addAttachment } = useCommentStore();
  const { openAudioSheet, closeAudioSheet } = useBottomSheetStore();

  /** Pick one or multiple docs */
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: true, // <— allow multiple selection
    });

    if (!result.canceled && result.assets?.length) {
      result.assets.forEach((file, index) => {
        // addAttachment({
        //   uri: file.uri,
        //   type: "doc",
        //   name: file.name || `doc-${Date.now()}-${index}`,
        //   mimeType: file.mimeType || "application/octet-stream",
        // });
        addAttachment({
          uri: file.uri,
          type: "doc",
          name: file.name || `doc-${Date.now()}-${index}`,
          mimeType: file.mimeType || "application/pdf", // or whatever DocumentPicker returns
        });
      });
      setModalVisible(false);
    }
  };

  /** Take one photo */
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Need camera permission");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled && result.assets?.length) {
      result.assets.forEach((asset, index) => {
        // addAttachment({
        //   uri: asset.uri,
        //   type: "image",
        //   name: asset.fileName || `photo-${Date.now()}-${index}.jpg`,
        //   mimeType: asset.type || "image/jpeg",
        // });
        addAttachment({
          uri: asset.uri,
          type: "image", // you can keep a logical type for your UI
          name: asset.fileName || `photo-${Date.now()}-${index}.jpg`,
          mimeType: "image/jpeg", // hardcode a valid MIME for photos
        });
      });
      setModalVisible(false);
    }
  };

  /** Choose one or multiple photos */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Need media library permission");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true, // <— multiple selection
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets?.length) {
      result.assets.forEach((asset, index) => {
        // addAttachment({
        //   uri: asset.uri,
        //   type: "image",
        //   name: asset.fileName || `photo-${Date.now()}-${index}.jpg`,
        //   mimeType: asset.type || "image/jpeg",
        // });
        addAttachment({
          uri: asset.uri,
          type: "image", // you can keep a logical type for your UI
          name: asset.fileName || `photo-${Date.now()}-${index}.jpg`,
          mimeType: "image/jpeg", // hardcode a valid MIME for photos
        });
      });
      setModalVisible(false);
    }
  };

  // For audio: after recording finishes, call addAttachment with the audio file.
  const showAudioModal = () => {
    setModalVisible(false);
    openAudioSheet({
      audioSnapPoints: ["90%"],
      audioContent: (
        <AudioModal
          visible={true}
          onAttachSuccess={() => {
            closeAudioSheet();
          }}
        />
      ),
    });
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
              Choose Photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={takePhoto}
            className="flex-row gap-3 items-center"
          >
            <Camera />
            <Text className="text-[#218EFD] text-base font-normal">
              Take a Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showAudioModal()}
            // onPress={() => router.push("/(main)/audio-recorder")}
            className="flex-row gap-3 items-center"
          >
            <Voice />
            <Text className="text-destructive text-base font-normal">
              Record Audio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
