import AntDesign from "@expo/vector-icons/AntDesign";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";
// import { FileText, File } from "lucide-react-native";

interface DocumentPreviewProps {
  name: string | undefined;
  uri: string;
  type?: string;
  size?: string;
}

const DocumentPreview = ({ name, uri, type, size }: DocumentPreviewProps) => {
  const openDocument = async () => {
    await WebBrowser.openBrowserAsync(uri); // opens PDF, DOCX, etc.
  };

  const getIcon = () => {
    if (type?.includes("pdf")) return <Text>Pdf</Text>;
    return <AntDesign name="file-pdf" color="#1D4ED8" size={24} />;
  };

  return (
    <TouchableOpacity
      onPress={openDocument}
      className="flex-row items-center bg-gray-100 border border-gray-200 rounded-lg p-3"
    >
      <View className="mr-3">{getIcon()}</View>

      <View className="flex-1">
        <Text numberOfLines={1} className="text-sm font-semibold text-gray-800">
          {name}
        </Text>
        <Text className="text-xs text-gray-500">
          {type?.toUpperCase() || "UNKNOWN"} {size ? `• ${size}` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentPreview;
