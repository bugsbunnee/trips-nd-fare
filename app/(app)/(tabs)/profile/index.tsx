
import React from 'react';
import _ from 'lodash';

import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import { useAppSelector } from '@/store/hooks';
import { colors, styles as defaultStyles, icons } from '@/constants';
import { Image, Text } from '@/components/ui';

import Screen from '@/components/navigation/Screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const ROUTES = [
  {
    label: 'Profile',
    icon: 'account-circle' as const,
    route: '/profile/edit-profile',
  },
  {
    label: 'Messages',
    icon: 'chat-processing' as const,
    route: '/booking/local-trips',
  },
  {
    label: 'Buy Bus Ticket',
    icon: 'ticket' as const,
    route: '/booking/local-trips',
  },
  {
    label: 'Local Trips',
    icon: 'rickshaw-electric' as const,
    route: '/local-trips',
  },
  {
    label: 'Ferry Tickets',
    icon: 'ferry' as const,
    route: '/booking/local-trips',
  },
  {
    label: 'Settings',
    icon: 'cog' as const,
    route: '/booking/local-trips',
  },
];

const ProfilePage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const insets = useSafeAreaInsets();

  return (
    <Screen style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.intro}>
          <View style={{ flex: 1 }}>
            <Text type='default-semibold' style={styles.fullName}>
              {auth.user!.name}
            </Text>
            
            <View style={styles.overview}>
              {_.range(1, 6).map((range) => (
                <MaterialCommunityIcons 
                  key={range}
                  name='star' 
                  color={colors.light.yellow} 
                  size={icons.SIZES.SMALL} 
                />
              ))}

              <Text type='default-semibold' style={styles.rating}>5.0</Text>
            </View>
          </View>

          <View style={defaultStyles.shadow}>
            <Image
                src={require('../../../../assets/images/map.png')}
                style={styles.image}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons 
              name='wallet'
              size={icons.SIZES.NORMAL}
              color={colors.light.black}
            />

            <Text type='default-semibold' style={styles.cardText}>
              Wallet
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card}>
            <Ionicons 
              name='receipt'
              size={icons.SIZES.NORMAL}
              color={colors.light.black}
            />

            <Text type='default-semibold' style={styles.cardText}>
              Trips
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      
      <View style={styles.screenSeparator} />

      <View style={styles.bottom}>
        <FlatList
              data={ROUTES}
              keyExtractor={(route) => route.label}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <Link href={item.route as any} asChild>
                  <TouchableOpacity style={styles.route}>
                    <MaterialCommunityIcons 
                      name={item.icon}
                      size={icons.SIZES.NORMAL}
                      color={colors.light.black}
                    />

                    <Text type='default' style={styles.routeLabel}>{item.label}</Text>
                  </TouchableOpacity>
                </Link>
              )}
            />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bottom: {
    paddingVertical: 21.9,
    paddingHorizontal: 33,
  },
  card: {
    backgroundColor: colors.light.dew,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    minHeight: 74,
    flex: 1
  },
  cardContainer: {
    marginTop: 30,
    columnGap: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cardText: {
    color: colors.light.black,
    fontSize: 15,
    lineHeight: 18,
    marginTop: 3
  },
  fullName: { 
    textTransform: "capitalize", 
    color: colors.light.black,
    fontWeight: defaultStyles.jakartaBold.fontWeight,
    fontSize: 25,
    lineHeight: 28
  },
  header: {
    paddingHorizontal: 33,
    paddingBottom: 0
  },
  image: {
    width: 67,
    height: 67,
    borderRadius: 67,
    borderWidth: 2,
    borderColor: colors.light.white,
  },
  intro: { 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
  },
  overview: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: colors.light.dew,
    borderRadius: 4,
    padding: 4,
    marginTop: 9,
    gap: 1
  },
  rating: {
    color: colors.light.black,
    lineHeight: 15,
    fontSize: 12,
  },
  route: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 20 },
  routeLabel: {
    color: colors.light.black,
    fontSize: 17,
    fontWeight: defaultStyles.jakartaMedium.fontWeight,
  },
  screen: { 
    backgroundColor: colors.light.white, 
  },
  screenSeparator: {
    height: 15,
    width: "100%",
    backgroundColor: colors.light.dew,
    marginTop: 20
  },
  separator: {
    height: 21,
    width: "100%"
  }
});

export default ProfilePage;
