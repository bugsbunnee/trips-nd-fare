
import React, { useCallback } from "react";
import { Text, TextInput } from "@/components/ui";
import { router } from "expo-router";

import Ride from "@/components/lists/Ride";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { app, colors, icons, styles as defaultStyles } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/slice";

const BookRidePage: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/');
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
              primaryIcon='magnifier' 
              width='100%' 
              placeholder='Where do you want to go?'
              containerStyle={styles.input} 
              onPress={() => router.push('/home/ride')}
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

            <View style={styles.ridesSection}>
              <Text type='subtitle' style={styles.subtitle}>Recent Rides</Text>

              {app.RIDES.map((ride) => (
                <View key={ride.id} style={styles.separator}>
                    <Ride ride={ride} />
                </View>
              ))}
            </View>
          </KeyboardAwareScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA', paddingHorizontal: 16 },
  subtitle: { fontSize: 20, color: colors.light.dark, letterSpacing: 0.05, marginBottom: 20, marginTop: 30 },
  greeting: { 
    fontSize: 22, 
    color: colors.light.dark, 
    fontWeight: defaultStyles.urbanistBold.fontWeight,
    fontFamily: defaultStyles.urbanistBold.fontFamily,
    lineHeight: 26, 
    letterSpacing: 0.05 
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  input: { backgroundColor: colors.light.white, borderColor: colors.light.grayLight, marginTop: 16 },
  image: { borderRadius: 16, height: 380, width: '100%', objectFit: 'cover' },
  logout: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light.white, borderRadius: 40 },
  ridesSection: { marginBottom: 130},
  separator: { marginBottom: 10 }
});
 
export default BookRidePage;
