import React, { ReactNode } from "react";
import { Platform, SafeAreaView, View } from "react-native";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView
      className="bg-white py-10"
      style={{ paddingTop: Platform.OS === "android" ? 20 : 0, flex: 1 }}
    >
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 22,
          paddingRight: 22,
          flex: 1,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;
