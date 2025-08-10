import React, { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import OnboardingStepFour from "./OnboardingStepFour";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepThree from "./OnboardingStepThree";
import OnboardingStepTwo from "./OnboardingStepTwo";

const { width } = Dimensions.get("window");

const steps = [
  { id: "1", component: <OnboardingStepOne /> },
  { id: "2", component: <OnboardingStepTwo /> },
  { id: "3", component: <OnboardingStepThree /> },
  { id: "4", component: <OnboardingStepFour /> },
];

const OnboardingScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={steps}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width }}>{item.component}</View>
        )}
      />

      {/* Custom Indicator */}
      <View style={styles.indicatorContainer}>
        {steps.map((_, index) => {
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
  );
};

export default OnboardingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(24, 169, 153, 0.3)", // faded teal
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#18A999", // active teal
    width: 24, // longer rectangle
    height: 8,
    borderRadius: 4,
  },
});
