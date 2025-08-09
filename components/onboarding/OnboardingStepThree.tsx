import StepTwoLogo from "@/assets/images/Onboarding-stepTwo-logo.svg";
import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";

const OnboardingStepThree = () => {
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <StepTwoLogo />

      <View className="p-8 -mt-28">
        <Text className="font-semibold text-center text-3xl text-black">
          Find the practicality in making your todo list
        </Text>
        <Text className="text-base text-center font-normal text-secondary mt-3">
          Easy-to-understand user interface that makes you more comfortable when
          you want to create a task or to do list, Todyapp can also improve
          productivity
        </Text>

        <Button className="my-5 w-full rounded-lg">Continue</Button>
      </View>
    </View>
  );
};

export default OnboardingStepThree;
