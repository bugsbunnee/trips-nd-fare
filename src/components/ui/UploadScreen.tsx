import React from "react";
import LottieView from "lottie-react-native";

import { View, StyleSheet, Modal } from "react-native";
import { Bar } from "react-native-progress";

import { colors } from "@/src/constants";


interface Props {
    onDone: () => void;
    progress: number;
    visible: boolean;
}

const UploadScreen: React.FC<Props> = ({ onDone, progress = 0, visible = false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Bar
            color={colors.light.primary}
            progress={progress}
            width={200}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("@/src/assets/animations/done.json")}
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
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;
