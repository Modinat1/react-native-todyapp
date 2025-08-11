import { FacebookIcon, GoogleIcon } from "@/assets";
import StepFourLogo from "@/assets/images/Onboarding-step-four-logo.svg";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import MessageIcon from "../../assets/icons/Message.svg";
import Button from "../Button";
import Container from "../Container";

const OnboardingStepFour = () => {
  const router = useRouter();
  return (
    <Container>
      <View className="flex-1 justify-between">
        <View className="mt-5">
          <Text className="font-semibold text-center text-[26px] text-black my-10">
            Welcome to <Text className="text-primary">Todyapp</Text>
          </Text>
          <StepFourLogo />

          {/* ----------- */}
          <View className=" ">
            <Button
              onPress={() => router.push("/(auth)/login")}
              className="items-center gap-3"
            >
              <MessageIcon />
              <Text className="text-white"> Continue with email</Text>
            </Button>

            <View className="flex-row items-center my-3">
              <View className="flex-1 h-[1px] bg-secondary-foreground" />
              <Text className="mx-3 text-secondary text-sm">
                or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-secondary-foreground" />
            </View>

            <View className="flex-row justify-between items-center gap-3 ">
              <Button className="bg-secondary-foreground  flex-1 flex-row justify-center items-center gap-2">
                <FacebookIcon />
                <Text className="text-black">Facebook</Text>
              </Button>

              <Button className="bg-secondary-foreground flex-1 flex-row justify-center items-center gap-2">
                <GoogleIcon />
                <Text className="text-black">Google</Text>
              </Button>
            </View>
          </View>
          {/* ----------- */}
        </View>
      </View>
    </Container>
  );
};

export default OnboardingStepFour;
