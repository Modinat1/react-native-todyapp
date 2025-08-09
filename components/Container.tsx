import React, { ReactNode } from "react";
import { Platform, SafeAreaView, View } from "react-native";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView
      className="bg-accent"
      style={{ paddingTop: Platform.OS === "android" ? 20 : 0, flex: 1 }}
    >
      <View style={{ padding: 10, flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;
