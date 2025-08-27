import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="themeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="instructions" options={{ headerShown: false }} />
      <Stack.Screen name="boards" options={{ headerShown: false }} />
      <Stack.Screen name="view-todo" options={{ headerShown: false }} />
      <Stack.Screen name="audio-recorder" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
