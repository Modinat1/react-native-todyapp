import StepTwoLogo from "@/assets/images/Onboarding-stepTwo-logo.svg";
import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";

const OnboardingStepTwo = () => {
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <StepTwoLogo />

      <View className="p-8 -mt-28">
        <Text className="font-semibold text-center text-3xl text-black">
          Your convenience in making a todo list
        </Text>
        <Text className="text-base text-center font-normal text-secondary mt-3">
          Here&#39;s a mobile platform that helps you create task or to list so
          that it can help you in every job easier and faster.
        </Text>

        <Button className="my-5 w-full rounded-lg">Continue</Button>
      </View>
    </View>
  );
};

export default OnboardingStepTwo;
