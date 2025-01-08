
import React, { useMemo, useState } from "react";
import _ from "lodash";

import { Text } from "@/components/ui";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import BookingListItem from "@/components/lists/BookinglistItem";
import EmptyItem from "@/components/lists/EmptyItem";
import Picker from "@/components/lists/Picker";
import RidePicker from "@/components/lists/RidePicker";
import Screen from "@/components/navigation/Screen";

import useBookings from "@/hooks/useRecentBookings";

import { colors } from "@/constants";
import { PickerItemModel } from "@/utils/models";
import { SORT_ORDER } from "@/constants/app";
import Conditional from "@/components/common/Conditional";
import BookingListItemSkeleton from "@/components/lists/BookinglistItemSkeleton";

const HistoryIndexPage : React.FC= () => {
    const [selectedOrder, setSelectedOrder] = useState<PickerItemModel | null>(null);
    const bookings = useBookings();

    const sortedBookings = useMemo(() => {
      const sortOrder = selectedOrder ? selectedOrder.value : 'asc' as any;
      return _.orderBy(bookings.bookings, ['createdAt'], sortOrder)
    }, [selectedOrder]);

    return ( 
      <Screen style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text type='subtitle' style={styles.subtitle}>Popular Car</Text>

            <View style={styles.pickerContainer}>
              <Picker
                label=""
                PickerTriggerComponent={RidePicker}
                onSelectItem={(order) => setSelectedOrder(order)}
                width="100%"
                selectedItem={selectedOrder} 
                placeholder="Select order" 
                items={SORT_ORDER} 
              />
            </View>
          </View>
        </View>
          
        <View style={styles.flex}>
            <FlatList
              data={sortedBookings}
              refreshing={bookings.isLoading}
              onRefresh={bookings.onRefresh}
              keyExtractor={(ride) => ride._id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <BookingListItem 
                  booking={item}
                  backgroundColor={colors.light.input}
                />
              )}
              ListEmptyComponent={() => (
                <>
                    <Conditional visible={!bookings.isLoading}>
                      <EmptyItem
                        label='No Rides Yet' 
                        description="You haven't booked any rides yet!"
                        onRefresh={bookings.onRefresh}
                      />
                    </Conditional>

                    <Conditional visible={bookings.isLoading}>
                        {_.range(1, 4).map((fill) => (
                          <BookingListItemSkeleton key={fill} />
                        ))}
                    </Conditional>
                </>
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
