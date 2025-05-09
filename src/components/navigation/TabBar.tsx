import React from 'react';
import TabBarButton from '@/src/components/navigation/TabBarButton';

import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { usePathname, useSegments } from 'expo-router';

import { colors, icons } from '@/src/constants';

type TabBarProps = Omit<BottomTabBarProps, 'insets'>;

const TabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  const segments = useSegments();
  const screenName = segments.at(-1) as string;
  const pagesToHide = ['ride', 'ferry', 'success', 'pending', 'choose-rider', 'banks', 'channel', 'setup',  'thread', 'ride-information', 'track', '[id]', 'wallet'];

  return (
    <View style={[styles.container, { display: pagesToHide.includes(screenName) ? 'none' : 'flex', bottom: 0 }]}>
      <View style={styles.content}>
        {state.routes
          .filter((route) => icons.TAB_ICONS[route.name as unknown as keyof typeof icons.TAB_ICONS])
          .map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              return (
                <TabBarButton
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  isFocused={isFocused}
                  routeName={route.name}
                  color={isFocused ? colors.light.primary : colors.light.primaryLight}
                />
              );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      backgroundColor: colors.light.white, 
      borderTopColor: colors.light.borderLight, 
      borderTopWidth: 1, 
      position: 'absolute', 
      width: '100%', 
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: 92
    },
    content: {
        flex: .9,
        height: 58,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light.primary,
        borderRadius: 60
    },
});

export default TabBar;
