import StepTwoLogo from "@/assets/images/Onboarding-stepTwo-logo.svg";
import { OnboardingStepProps } from "@/lib/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import Container from "../Container";

const OnboardingStepTwo = ({
  goToNext,
  currentIndex,
  totalSteps,
}: OnboardingStepProps) => {
  return (
    <Container>
      <View className="flex-1 justify-between">
        <View className="mt-20">
          <StepTwoLogo />

          <View className="-mt-20">
            <Text className="font-semibold text-center text-3xl text-black">
              Your convenience in making a todo list
            </Text>
            <Text className="text-base text-center font-normal text-secondary mt-3">
              Here&#39;s a mobile platform that helps you create task or to list
              so that it can help you in every job easier and faster.
            </Text>

            {/* ----------indicator */}
            <View className="my-5">
              <View className="flex-row justify-center items-center">
                {Array.from({ length: totalSteps }).map((_, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <View
                      key={index}
                      style={[styles.dot, isActive && styles.activeDot]}
                    />
                  );
                })}
              </View>
              {/* ----------indicator */}
            </View>
          </View>
        </View>
        <Button onPress={goToNext} className="my-5">
          Continue
        </Button>
      </View>
    </Container>
  );
};

export default OnboardingStepTwo;

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBF1F0",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#24A19C",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});
