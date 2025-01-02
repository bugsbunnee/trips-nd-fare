
import React, { useState } from "react";
import { Text } from "@/components/ui";
import { FlatList, StyleSheet, View } from "react-native";

import BookingListItem from "@/components/lists/BookinglistItem";
import Screen from "@/components/navigation/Screen";
import Picker from "@/components/lists/Picker";

import useBookings from "@/hooks/useRecentBookings";

import { colors } from "@/constants";
import { PickerItemModel, UserRide } from "@/utils/models";
import { SORT_ORDER } from "@/constants/app";

const HistoryIndexPage : React.FC= () => {
    const [selectedOrder, setSelectedOrder] = useState<PickerItemModel | null>(null);
    const data = useBookings();

    return ( 
      <Screen style={styles.container}>
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
        </View>
          
        <View style={styles.flex}>
          <FlatList
            data={data.bookings}
            refreshing={data.isLoading}
            onRefresh={data.onRefresh}
            keyExtractor={(ride) => ride._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <BookingListItem 
                booking={item}
                backgroundColor={colors.light.input}
              />
            )}
          />
        </View>
      </Screen>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', paddingHorizontal: 16, paddingBottom: 70 },
  flex: { flex: 1 },
  subtitle: { fontSize: 20, color: colors.light.dark, letterSpacing: 0.05 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  marginBottom: 20, marginTop: 30 },
  pickerContainer: { alignItems: 'flex-start', justifyContent: 'flex-start' },
  separator: { marginVertical: 10 },
});
 
export default HistoryIndexPage;
