import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";

import { Text } from "@/src/components/ui";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import BookingListItem from "@/src/components/lists/BookinglistItem";
import BookingListItemSkeleton from "@/src/components/lists/BookinglistItemSkeleton";
import Conditional from "@/src/components/common/Conditional";
import EmptyItem from "@/src/components/lists/EmptyItem";
import Screen from "@/src/components/navigation/Screen";

import { colors, styles as defaultStyles } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { getUpcomingRides } from "@/src/store/data/actions";

const UpcomingRidesPage : React.FC= () => {
    const [selectedRide, setSelectedRide] = useState('');

    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data);

    const handleFetchRides = () => {
      dispatch(getUpcomingRides());
    };

    useEffect(() => {
      handleFetchRides();
    }, []);

    useEffect(() => {
      if (!selectedRide && data.upcomingRides.length > 0) {
        setSelectedRide(data.upcomingRides[0]._id)
      }
    }, [selectedRide, data.upcomingRides]);

    const upcomingRides = useMemo(() => {
      const rideMatch = data.upcomingRides.find((ride) => ride._id === selectedRide);
      return rideMatch ? rideMatch.rides : [];
    }, [data.upcomingRides, selectedRide]);

    return ( 
      <Screen style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text type='subtitle' style={styles.subtitle}>Upcoming Trips</Text>
          </View>

          <View style={styles.pickerContainer}>
            {data.upcomingRides.map((ride) => (
              <TouchableOpacity key={ride._id} onPress={() => setSelectedRide(ride._id)} style={[styles.tripButton, ride._id === selectedRide ? styles.selectedBG : styles.unselectedBG]}>
                <Text type="default-semibold" style={[styles.tripButtonLabel, ride._id === selectedRide ? styles.selectedText : styles.unselectedText]}>{ride.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
          
        <View style={styles.flex}>
            <FlatList
              data={upcomingRides}
              refreshing={data.isLoading}
              onRefresh={handleFetchRides}
              keyExtractor={(ride) => ride._id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <BookingListItem
                  date={item.departureDate}
                  booking={item}
                  backgroundColor={colors.light.primaryLight}
                  isScheduled={true}
                />
              )}
              ListEmptyComponent={() => (
                <>
                    <Conditional visible={!data.isLoading}>
                      <EmptyItem
                        label='No Upcoming Rides Yet' 
                        description="Your upcoming rides will appear here."
                        onRefresh={handleFetchRides}
                      />
                    </Conditional>

                    <Conditional visible={data.isLoading}>
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
  pickerContainer: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 22 },
  separator: { marginVertical: 10 },
  selectedBG: { backgroundColor: colors.light.primary },
  selectedText: { color: colors.light.white },
  unselectedBG: { backgroundColor: colors.light.white },
  unselectedText: { color: colors.light.primary },
  tripButton: { flex: 1, paddingVertical: 9, borderRadius: 5 },
  tripButtonLabel: { textAlign: 'center', textTransform: 'capitalize', fontSize: 16, lineHeight: 24, fontFamily: defaultStyles.jakartaSemibold.fontFamily },
});
 
export default UpcomingRidesPage;
