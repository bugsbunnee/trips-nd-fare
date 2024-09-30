import Ride from "@/components/lists/Ride";

import { Text, TextInput } from "@/components/ui";
import { useCallback } from "react";
import { router } from "expo-router";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, icons } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/slice";

const BookRide = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const insets = useSafeAreaInsets();

    const handleLogout = useCallback(() => {
      dispatch(logout());
      router.push('/(auth)/')
    }, [dispatch]);

    return ( 
      <View style={[styles.container, { paddingTop: insets.top }]}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text type='default-semibold' style={styles.greeting}>
                  Welcome, {auth.user!.name}
                </Text>

                <TouchableOpacity style={[styles.logout]} onPress={handleLogout}>
                  <MaterialCommunityIcons 
                    name='logout' 
                    size={icons.SIZES.NORMAL} 
                    color={colors.light.primary} 
                  />
                </TouchableOpacity>
            </View>

            <TextInput 
              icon='magnify' 
              width='100%' 
              placeholder='Where do you want to go?'
              containerStyle={styles.input} 
            />

            <View>
              <Text type='subtitle' style={styles.subtitle}>Your current location</Text>

              <View>
                <Image
                  source={require('@/assets/images/map-large.png')} 
                  alt='Map' 
                  style={styles.image} 
                />
              </View>
            </View>

            <View style={{ marginBottom: 130}}>
              <Text type='subtitle' style={styles.subtitle}>Recent Rides</Text>

              <Ride 
                  driverName="Albert Akang"
                  carSeats={4}
                  date="2023-10-20 04:55"
                  status='paid'
                  fromAddress="Ogombo road, Ajah"
                  toAddress="Lekki scheme 2. Lagos"
              />
            </View>
          </KeyboardAwareScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', paddingHorizontal: 16 },
  subtitle: { fontSize: 20, color: colors.light.dark, letterSpacing: 0.05, marginBottom: 20, marginTop: 30 },
  greeting: { fontSize: 22, color: colors.light.dark, lineHeight: 26, letterSpacing: 0.05 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  input: { backgroundColor: colors.light.white, borderColor: colors.light.grayLight, marginTop: 16 },
  image: { borderRadius: 16, height: 380, width: '100%', resizeMode: 'cover' },
  logout: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light.white, borderRadius: 40 }
});
 
export default BookRide;
