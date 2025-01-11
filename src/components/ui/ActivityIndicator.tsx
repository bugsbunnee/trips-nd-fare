import React from "react";
import LottieView from "lottie-react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { View, StyleSheet } from "react-native";
import { colors } from "@/src/constants";

interface Props {
    visible: boolean;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const ActivityIndicator: React.FC<Props> = ({ visible = false }) => {
  const style = useAnimatedStyle(() => ({
    width: withSpring(150),
    height: 150
  }));

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        autoPlay
        loop
        style={[styles.lottie, style]}
        source={require("@/src/assets/animations/loader.json")}
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
