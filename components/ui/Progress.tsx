
import React from "react";
import LottieView from "lottie-react-native";
import * as Progress from 'react-native-progress';

import { View, StyleSheet, Modal } from "react-native";
import { colors } from "@/constants";

interface Props {
    progress: number;
    visible: boolean;
    onDone: () => void;
}

const AppProgress: React.FC<Props> = ({ onDone, progress = 0, visible = false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={colors.light.primary}
            progress={progress}
            width={200}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("@/assets/animations/done.json")}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default AppProgress;
