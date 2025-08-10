import React, { useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import OnboardingStepFour from "./OnboardingStepFour";
import OnboardingStepOne from "./OnboardingStepOne";
import OnboardingStepThree from "./OnboardingStepThree";
import OnboardingStepTwo from "./OnboardingStepTwo";

const { width } = Dimensions.get("window");

const OnboardingScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const steps = [
    {
      id: "1",
      component: (
        <OnboardingStepOne currentIndex={currentIndex} totalSteps={4} />
      ),
    },
    {
      id: "2",
      component: (
        <OnboardingStepTwo
          goToNext={goToNext}
          currentIndex={currentIndex}
          totalSteps={4}
        />
      ),
    },
    {
      id: "3",
      component: (
        <OnboardingStepThree
          goToNext={goToNext}
          currentIndex={currentIndex}
          totalSteps={4}
        />
      ),
    },
    { id: "4", component: <OnboardingStepFour /> },
  ];

  function goToNext() {
    if (currentIndex < steps.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  }

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
        style={{ flex: 1 }}
      />

      {/* Bottom section with indicator and button */}
      {/* <View style={styles.bottomContainer}>
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
        </View> */}

      {/* <TouchableOpacity style={styles.button} onPress={goToNext}>
          <Text style={styles.buttonText}>
            {currentIndex === steps.length - 1 ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
};

export default OnboardingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    padding: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // space between indicator and button
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(24, 169, 153, 0.3)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#18A999",
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#18A999",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
