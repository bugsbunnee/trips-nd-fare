import React from 'react';
import TabBar from '@/components/navigation/TabBar';

import { Tabs } from 'expo-router';
import { colors } from '@/constants';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <TabBar state={props.state} navigation={props.navigation} descriptors={props.descriptors} />}
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="booking" options={{ title: 'Booking' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet', href: null }} />
      <Tabs.Screen name="local-trips" options={{ title: 'Local Trips', href: null }} />
    </Tabs>
  );
}
