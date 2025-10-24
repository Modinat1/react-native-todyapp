import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Image, TouchableOpacity, View } from "react-native";
import AudioWaveForm from "./AudioWaveForm";
import DocumentPreview from "./DocumentPreviewer";

interface AttachmentPreviewerProps {
  attachments: {
    uri: string;
    name?: string;
    type?: string;
  }[];
  onRemove?: () => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
}

const AttachmentPreviewer = ({
  attachments,
  onRemove,
  isPlaying,
  setIsPlaying,
}: AttachmentPreviewerProps) => {
  const playAudio = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <View className="w-[50%] relative">
      <View className="w-7 h-7 absolute -top-3 -right-3 z-10 bg-secondary-foreground flex-row justify-center items-center rounded-full">
        <TouchableOpacity
          onPress={() => onRemove?.()}
          className="font-semibold"
        >
          <AntDesign name="close" size={15} color="black" />
        </TouchableOpacity>
      </View>
      {attachments && attachments.length > 0 && (
        <View>
          {attachments.map((attachment, index) => {
            if (attachment.type === "image") {
              return (
                <View key={index}>
                  <Image
                    source={{ uri: attachment.uri }}
                    resizeMode="cover"
                    className=" h-24 rounded-lg"
                  />
                </View>
              );
            } else if (attachment.type === "audio") {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => playAudio(attachment.uri)}
                  className="flex-row items-center gap-2 p-2 bg-gray-200 rounded-lg"
                >
                  <AudioWaveForm
                    audioUri={attachment.uri}
                    isPlaying={isPlaying ?? false}
                    setIsPlaying={setIsPlaying ?? ((playing: boolean) => {})}
                  />
                </TouchableOpacity>
              );
            } else if (attachment.type === "doc") {
              return (
                <DocumentPreview
                  key={index}
                  uri={attachment.uri}
                  name={attachment.name}
                  type={attachment.name}
                />
              );
            }
          })}
        </View>
      )}
    </View>
  );
};

export default AttachmentPreviewer;
