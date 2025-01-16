import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal, DimensionValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

import { Button, Text, TextInput } from "@/src/components/ui";
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  const handleOpenSheet = useCallback(() => {
    if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.present();
    }
  }, []);

  const handleCloseSheet = useCallback(() => {
    if (bottomSheetModalRef.current) {
        bottomSheetModalRef.current.dismiss();
    }
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.value.toString().toLowerCase().includes(query.toLowerCase()));
  }, [query, items]);

  useEffect(() => {
    if (isVisible) handleOpenSheet();
    else handleCloseSheet();
  }, [isVisible]);

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
          <BottomSheetModalProvider> 
            <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.body]}>
                <BottomSheetModal 
                  animateOnMount 
                  ref={bottomSheetModalRef} 
                  enablePanDownToClose={false} 
                  enableDynamicSizing={false} 
                  index={0} 
                  snapPoints={['75%']}
                >
                    <BottomSheetView style={styles.content}>
                      <TextInput
                        primaryIcon="magnifier"
                        placeholder="Enter item to search"
                        onChangeText={(text) => setQuery(text)}
                        value={query}
                      />
                    </BottomSheetView>

                    <BottomSheetScrollView style={styles.content}>
                      {filteredItems.map((item) => (
                        <PickerItemComponent
                          isActive={item.value === selectedItem?.value}
                          item={item}
                          key={item.value}
                          label={item.label}
                          onPress={() => onSelectItem(item)}
                        />
                      ))}
                    </BottomSheetScrollView> 

                    <View style={[styles.close, styles.content]}>
                        <Button label='Close' onPress={() => setVisible(false)} />
                    </View>
                </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    backgroundColor: colors.light.modalOpaque,
  },
  container: {
		borderRadius: 8,
		backgroundColor: colors.light.dew,
		paddingVertical: 8,
		paddingHorizontal: 12,
    height: 70
	},
  close: {
    marginTop: 10,
    paddingBottom: 16
  },
  content: { 
    paddingHorizontal: 20,
  },
  iconContainer: {
		marginRight: 10,
	},
  popup: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  modal: {
    backgroundColor: colors.light.modalOpaque,
    flex: 1,
    zIndex: 100000,
  },
  separator: {
    height: 5,
    width: '100%'
  },
  placeholder: {
    color: colors.light.placeholder,
    fontSize: 15,
    lineHeight: 20,
		letterSpacing: 0.25,
		flex: 1,
    textAlign: 'left',
		fontFamily: defaultStyles.urbanistBold.fontFamily,
  },
  picker: {
		marginBottom: 12,
  },
  error: {
		color: colors.light.danger,
		fontSize: 13,
		letterSpacing: 0.5,
		textAlign: 'left',
        marginTop: 4
	},
  input: {
      marginTop: 7,
      flex: 1,
  },
	text: {
      color: colors.light.dark,
      textAlign: 'left',
      fontSize: 15,
      lineHeight: 18,
      fontFamily: defaultStyles.urbanistBold.fontFamily,
  },
  label: {
      fontFamily: defaultStyles.urbanistBold.fontFamily,
      fontSize: 10,
      lineHeight: 12,
      color: colors.light.grayDeep
  },
});

export default Picker;
