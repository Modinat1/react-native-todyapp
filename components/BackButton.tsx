import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = ({
  onPress = () => router.back(),
}: {
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
