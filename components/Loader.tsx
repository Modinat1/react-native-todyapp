import { colors } from "@/colorSettings";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const Loader = () => {
  return (
    <View className="flex justify-center items-center">
      <ActivityIndicator color={colors.primary.DEFAULT} size={20} />
      <Text>Loading...</Text>
    </View>
  );
};

export default Loader;
