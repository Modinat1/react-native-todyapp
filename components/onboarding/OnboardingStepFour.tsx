import { FacebookIcon, GoogleIcon } from "@/assets";
import StepFourLogo from "@/assets/images/Onboarding-step-four-logo.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import MessageIcon from "../../assets/icons/Message.svg";
import Button from "../Button";

const OnboardingStepFour = () => {
  const router = useRouter();
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <Text className="font-semibold text-[26px] text-black my-10">
        Welcome to <Text className="text-primary">Todyapp</Text>
      </Text>
      <StepFourLogo />

      <View className="p-8 -mt-28">
        <Button onPress={() => router.push("/(auth)/login")} className="">
          <MessageIcon />
          <Text>Continue with email</Text>
        </Button>

        <View>
          <Text>or continue with</Text>
        </View>

        <View className="flex-row justify-between items-center gap-3 mt-5">
          <Button className="bg-secondary flex-1 flex-row justify-center items-center gap-2">
            <FacebookIcon />
            <Text className="text-black">Facebook</Text>
          </Button>

          <Button className="bg-secondary flex-1 flex-row justify-center items-center gap-2">
            <GoogleIcon />
            <Text className="text-black">Google</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OnboardingStepFour;
