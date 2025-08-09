import {
  CalenderIcon,
  CategoryIcon,
  HomeIcon,
  SettingsIcon,
  TodoListIcon,
} from "@/assets";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, ViewStyle } from "react-native";

export default function TabLayout() {
  const tabBarStyle: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "ios" ? 110 : 70,
    paddingTop: 10,
    paddingBottom: 30,
    position: "absolute",
    backgroundColor: "white",
    borderTopWidth: 0,
  };

  const TAB_ITEMS = [
    { name: "home", icon: HomeIcon },
    { name: "todos", icon: TodoListIcon },
    { name: "calender", icon: CalenderIcon },
    { name: "category", icon: CategoryIcon },
    { name: "settings", icon: SettingsIcon },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props: any) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: tabBarStyle,
          default: tabBarStyle,
        }),
      }}
    >
      {TAB_ITEMS.map(({ name, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon width={24} height={24} color={focused ? "#000" : "#999"} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
