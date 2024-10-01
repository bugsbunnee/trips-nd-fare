import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList, DimensionValue } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "@/components/ui";
import { colors, icons } from '@/constants';
import { PickerItemModel } from "@/utils/models";

import PickerItem from "@/components/lists/PickerItem";
import Screen from '@/components/navigation/Screen';

interface Props<T> {
    icon?: string;
    items: T[];
    selectedItem: T | null;
    placeholder: string;
    PickerItemComponent?: React.ElementType;
    onSelectItem: (item: T) => void;
    numberOfColumns: number;
    width: DimensionValue;
}

const Picker: React.FC<Props<PickerItemModel>> = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
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

          <MaterialCommunityIcons
            name="chevron-down"
            size={icons.SIZES.NORMAL}
            color={colors.light.primary}
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
              <PickerItemComponent
                item={item}
                label={item.label}
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
    color: colors.light.primary,
    fontSize: 13,
  },
});

export default Picker;
