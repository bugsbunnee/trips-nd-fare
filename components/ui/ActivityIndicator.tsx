import React from "react";
import LottieView from "lottie-react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { View, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface Props {
    visible: boolean;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const ActivityIndicator: React.FC<Props> = ({ visible = false }) => {
  if (!visible) return null;

  const width = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
        width: withSpring(150),
        height: 150
    }
  });

  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        autoPlay
        loop
        style={[styles.lottie, style]}
        source={require("@/assets/animations/loader.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light.background,
    height: "100%",
    opacity: 0.9,
    width: "100%",
    zIndex: 1,
  },
  lottie: {
    width: 50,
    height: 50,
  }
});

export default ActivityIndicator;
