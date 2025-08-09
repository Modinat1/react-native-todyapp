import Logo from "@/assets/images/Logo-Onboarding.svg";
import React from "react";
import { Text, View } from "react-native";

const OnboardingStepOne = () => {
  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <Logo />
      <Text className="font-bold text-2xl text-white">Todyapp</Text>
      <Text className="text-sm font-normal text-white my-2">
        The best to do list application for you
      </Text>

      <View className={`w-2 h-2 rounded-full bg-white mx-1 mt-5 `}></View>
      {/* <View className={`w-2 h-2 rounded-full bg-white mx-1 `}></View> */}
    </View>
  );
};

export default OnboardingStepOne;
