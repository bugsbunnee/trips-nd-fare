
import React, { useState } from "react";
import { Text } from "@/components/ui";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Ride from "@/components/lists/Ride";
import Picker from "@/components/lists/Picker";

import { colors } from "@/constants";
import { PickerItemModel, UserRide } from "@/utils/models";
import { RIDES, SORT_ORDER } from "@/constants/app";

const HistoryIndexPage : React.FC= () => {
    const [selectedOrder, setSelectedOrder] = useState<PickerItemModel | null>(null);
    const insets = useSafeAreaInsets();

    return ( 
      <View style={[styles.container, { paddingTop: insets.top }]}>
          <View>
            <View style={styles.header}>
              <Text type='subtitle' style={styles.subtitle}>Popular Car</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  onSelectItem={(order) => setSelectedOrder(order)}
                  width="100%"
                  numberOfColumns={1}
                  selectedItem={selectedOrder} 
                  placeholder="Select order" 
                  items={SORT_ORDER} 
                />
              </View>
            </View>

            <FlatList
              data={RIDES}
              keyExtractor={(ride) => ride.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <Ride 
                  ride={item}
                  backgroundColor={colors.light.input}
                />
              )}
            />
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', paddingHorizontal: 16 },
  subtitle: { fontSize: 20, color: colors.light.dark, letterSpacing: 0.05 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  marginBottom: 20, marginTop: 30 },
  pickerContainer: { alignItems: 'flex-start', justifyContent: 'flex-start' },
  separator: { marginVertical: 10 },
});
 
export default HistoryIndexPage;
