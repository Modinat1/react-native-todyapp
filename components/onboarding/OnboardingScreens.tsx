import React from "react";
import { View } from "react-native";
import OnboardingStepFour from "./OnboardingStepFour";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepThree from "./OnboardingStepThree";
import OnboardingStepTwo from "./OnboardingStepTwo";

const OnboardingScreens = () => {
  return (
    <View>
      <OnboardingStepOne />
      <OnboardingStepTwo />
      <OnboardingStepThree />
      <OnboardingStepFour />
    </View>
  );
};

export default OnboardingScreens;
