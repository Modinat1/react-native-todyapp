import Logo from "@/assets/images/Logo-Onboarding.svg";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface OnboardingStepOneProps {
  currentIndex: number;
  totalSteps: number;
}

const OnboardingStepOne = ({
  currentIndex,
  totalSteps,
}: OnboardingStepOneProps) => {
  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <Logo />
      <Text className="font-bold text-2xl text-white">Todyapp</Text>
      <Text className="text-sm font-normal text-white my-2">
        The best to do list application for you
      </Text>

      {/* Bottom area with indicator + button */}
      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
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
      </View>
    </View>
  );
};

export default OnboardingStepOne;

const styles = StyleSheet.create({
  bottomContainer: {
    padding: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#ffffff",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});
