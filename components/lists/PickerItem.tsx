import React from "react";

import { TouchableOpacity, StyleSheet } from "react-native";
import { PickerItemModel } from "@/utils/models";
import { Text } from "../ui";

interface Props {
    item: PickerItemModel;
    onPress: () => void;
}

const PickerItem: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text type='default' style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
