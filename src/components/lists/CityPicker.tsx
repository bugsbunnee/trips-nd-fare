import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList, DimensionValue } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "@/src/components/ui";
import { colors, icons, styles as defaultStyles } from '@/src/constants';
import { PickerItemModel } from "@/src/utils/models";

import PickerItem from "@/src/components/lists/PickerItem";
import Screen from '@/src/components/navigation/Screen';

interface Props<T> {
    icon?: string;
    items: T[];
    selectedItem: T | null;
    placeholder: string;
    onSelectItem: (item: T) => void;
    numberOfColumns: number;
    width: DimensionValue;
}

const CityPicker: React.FC<Props<PickerItemModel>> = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon as any}
              size={icons.SIZES.NORMAL}
              color={colors.light.gray}
              style={styles.icon}
            />
          )}

          {selectedItem ? (
            <Text type="default" style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text type="default" style={styles.placeholder}>{placeholder}</Text>
          )}

          <Ionicons
            name="caret-down"
            size={icons.SIZES.SMALL}
            color={colors.light.dark}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.light.gray,
    fontSize: 13,
  },
  text: {
    fontSize: 20,
    lineHeight: 28,
    color: colors.light.dark,
    fontFamily: defaultStyles.urbanistBold.fontFamily,
  },
});

export default CityPicker;
