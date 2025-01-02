
import React, { useCallback, useEffect } from "react";
import _ from "lodash";

import { Text } from "@/components/ui";
import { router } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CurrentLocationMap from "@/components/maps/CurrentLocationMap";
import GoogleTextInput from "@/components/ui/GoogleTextInput";
import BookingListItem from "@/components/lists/BookinglistItem";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/slice";
import { setLocationTo } from "@/store/ride/slice";
import { colors, icons, styles as defaultStyles } from "@/constants";
import { Location } from "@/utils/models";
import { getNearbyRiders } from "@/store/data/actions";

import useNearbyRiders from "@/hooks/useNearbyRiders";
import useLocation from "@/hooks/useLocation";
import useBookings from "@/hooks/useRecentBookings";

const BookRidePage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const ride = useAppSelector((state) => state.ride);
    
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();
    const location = useLocation();
    
    const nearbyRiders = useNearbyRiders();
    const bookings = useBookings();

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/');
    }, [dispatch]);

    const handleSetDestination = useCallback((location: Location) => {
      dispatch(setLocationTo(location));
      router.push('/home/ride');
    }, [dispatch]);

    useEffect(() => {
      async function getRiders() {
        if (!location || !ride.selectedService) return;
  
        const coordinates = _.pick(location, ['latitude', 'longitude']);
        await dispatch(getNearbyRiders(coordinates));
      }
  
      getRiders();
    }, [dispatch, location, ride.selectedService]);

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

                    <TouchableOpacity style={[styles.logout]} onPress={handleLogout}>
                      <MaterialCommunityIcons 
                        name='logout' 
                        size={icons.SIZES.NORMAL} 
                        color={colors.light.primary} 
                      />
                    </TouchableOpacity>
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
  logout: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light.white, borderRadius: 40 },
  ridesSection: { marginBottom: 130},
  separator: { marginBottom: 10 }
});
 
export default BookRidePage;
