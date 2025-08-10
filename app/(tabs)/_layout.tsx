import {
  CalenderIcon,
  CategoryIcon,
  HomeIcon,
  SettingsIcon,
  TodoListIcon,
} from "@/assets/svgs/svg";
import { colors } from "@/colorSettings";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";

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
          <TouchableOpacity
            {...props}
            activeOpacity={1}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
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
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopWidth: focused ? 3 : 0,
                  borderTopColor: focused
                    ? colors.primary.DEFAULT
                    : "transparent",
                  paddingTop: 6,
                }}
              >
                <Icon
                  width={24}
                  height={24}
                  color={focused ? colors.primary.DEFAULT : "#A0AAB8"}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
