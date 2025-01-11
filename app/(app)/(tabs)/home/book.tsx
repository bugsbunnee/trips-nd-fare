
import React, { useCallback, useEffect } from "react";
import _ from "lodash";

import { Text } from "@/src/components/ui";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CurrentLocationMap from "@/src/components/maps/CurrentLocationMap";
import GoogleTextInput from "@/src/components/ui/GoogleTextInput";
import BookingListItem from "@/src/components/lists/BookinglistItem";
import Logout from "@/src/components/common/Logout";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setLocationTo } from "@/src/store/ride/slice";
import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Location } from "@/src/utils/models";
import { getNearbyRiders } from "@/src/store/data/actions";

import useNearbyRiders from "@/src/hooks/useNearbyRiders";
import useLocation from "@/src/hooks/useLocation";
import useBookings from "@/src/hooks/useRecentBookings";
import EmptyItem from "@/src/components/lists/EmptyItem";
import BookingListItemSkeleton from "@/src/components/lists/BookinglistItemSkeleton";
import Conditional from "@/src/components/common/Conditional";

const BookRidePage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const location = useLocation();
    
    const nearbyRiders = useNearbyRiders();
    const bookings = useBookings();

    const handleSetDestination = useCallback((location: Location) => {
      dispatch(setLocationTo(location));
      router.push('/home/ride');
    }, [dispatch]);

    useEffect(() => {
      async function getRiders() {
        if (location) {
          dispatch(getNearbyRiders({
            latitude: location.latitude,
            longitude: location.longitude,
          }));
        }
      }
  
      getRiders();
    }, [dispatch, location]);

    return ( 
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <FlatList
            refreshing={bookings.isLoading}
            onRefresh={bookings.onRefresh}
            data={bookings.bookings.slice(0, 3)}
            keyboardShouldPersistTaps='always'
            keyExtractor={(booking) => booking._id}
            renderItem={({ item }) => <BookingListItem booking={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={() => (
              <>
                <View style={styles.header}>
                  <Text type='default-semibold' style={styles.greeting}>
                    Welcome, {auth.user!.firstName}
                  </Text>

                  <Logout />
                </View>

                <GoogleTextInput
                    leftIcon="magnifier"
                    placeholder="Where do you want to go?"
                    onPress={handleSetDestination}
                    containerStyle={styles.input}
                />

                <View>
                  <Text type='subtitle' style={styles.subtitle}>Your current location</Text>

                  <View style={styles.map}>
                    <CurrentLocationMap markers={nearbyRiders} />
                  </View>
                </View>

                <View>
                  <Text type='subtitle' style={styles.subtitle}>Recent Rides</Text>
                </View>
              </>
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
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', paddingHorizontal: 16, paddingBottom: 100 },
  subtitle: { fontSize: 20, color: colors.light.dark, letterSpacing: 0.05, marginBottom: 20, marginTop: 30 },
  greeting: { 
    fontSize: 22, 
    color: colors.light.dark, 
    fontFamily: defaultStyles.urbanistBold.fontFamily,
    lineHeight: 26, 
    letterSpacing: 0.05 
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  input: { backgroundColor: colors.light.white, borderColor: colors.light.grayLight, marginTop: 16, marginBottom: 0 },
  map: { borderRadius: 16, height: 380, width: '100%', overflow: 'hidden' },
  ridesSection: { marginBottom: 130},
  separator: { marginBottom: 10 }
});
 
export default BookRidePage;
