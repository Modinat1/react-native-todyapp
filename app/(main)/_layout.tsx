import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="themeScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
