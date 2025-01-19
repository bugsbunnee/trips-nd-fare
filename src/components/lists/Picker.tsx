import React, { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Modal, DimensionValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, TextInput } from "@/src/components/ui";
import { colors, styles as defaultStyles } from '@/src/constants';
import { PickerItemModel } from "@/src/utils/models";

import PickerItem from "@/src/components/lists/PickerItem";
import PickerTrigger from "@/src/components/lists/PickerTrigger";
export interface PickerProps {
    label: string;
    items: PickerItemModel[];
    selectedItem: PickerItemModel | null;
    placeholder: string;
    icon?: string;
    PickerItemComponent?: React.ElementType;
    PickerTriggerComponent?: React.ElementType;
    onSelectItem: (item: PickerItemModel) => void;
    width?: DimensionValue;
}

const Picker: React.FC<PickerProps> = ({
  label,
  items,
  icon,
  onSelectItem,
  PickerItemComponent = PickerItem,
  PickerTriggerComponent = PickerTrigger,
  placeholder,
  selectedItem,
  width = "100%",
}) => {
  const [isVisible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const insets = useSafeAreaInsets();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const valueToTraverse = item.value.toString().toLowerCase();
      const labelToTraverse = item.label.toString().toLowerCase();
      const queryToTraverse = query.toLowerCase();

      return valueToTraverse.includes(queryToTraverse) || labelToTraverse.includes(queryToTraverse);
    });
  }, [query, items]);

  return (
    <>
      <PickerTriggerComponent 
        width={width}
        label={label}
        icon={icon}
        value={selectedItem?.label} 
        placeholder={placeholder} 
        onPress={() => setVisible(true)} 
      />

      <Modal visible={isVisible} animationType="slide" >
        <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.body]}>
          <View style={styles.inputContainer}>
            <TextInput
              primaryIcon='magnifier'
              placeholder="Enter item to search"
              onChangeText={(text) => setQuery(text)}
              value={query}
              style={styles.inputText}
              containerStyle={styles.input}
            />
          </View>

          <ScrollView bounces={false} contentContainerStyle={styles.content}>
            {filteredItems.map((item) => (
              <PickerItemComponent
                isActive={item.value === selectedItem?.value}
                item={item}
                key={item.value}
                label={item.label}
                onPress={() => onSelectItem(item)}
              />
            ))}
          </ScrollView> 

          <View style={styles.footer}>
            <Button label='Close' onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    backgroundColor: colors.light.white,
  },
  container: {
    borderWidth: 1,
		borderRadius: 50,
		borderColor: colors.light.dew,
		backgroundColor: colors.light.dew,
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
    gap: 4,
		paddingHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopColor: colors.light.dewDark,
    borderTopWidth: 1,
  },
  content: { 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.light.white,
  },
  iconContainer: {
		marginRight: 10,
	},
  input: { 
    backgroundColor: colors.light.dew,
    borderRadius: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    borderBottomColor: colors.light.dewDark,
    borderBottomWidth: 1,
  },
  inputText: {
    fontSize: 14,
    fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    flex: 1,
    alignSelf: 'center'
  },
  popup: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modal: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flex: 1,
  },
  modalContent: {
      backgroundColor: colors.light.white,
      flex: 1,
  },
  label: {
		color: colors.light.dark,
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 6,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
	},
  placeholder: {
    color: colors.light.placeholder,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
  picker: {
		marginBottom: 18,
  },
  text: {
    color: colors.light.dark,
    fontSize: 12,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
		fontFamily: defaultStyles.jakartaSemibold.fontFamily,
  },
});

export default Picker;
