import React from 'react';
import TabBarButton from './TabBarButton';

import { View, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSegments } from 'expo-router';

import { colors } from '@/constants';

const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation, ...others }) => {
  const { bottom } = useSafeAreaInsets();
  const segments = useSegments();

  const pagesToHide = ['ride', 'choose-rider'];
  const screenName = segments.at(-1) as string;

  return (
    <View style={[styles.container, { display: pagesToHide.includes(screenName) ? 'none' : 'flex', bottom: 0, paddingBottom: bottom }]}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
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
    container: { backgroundColor: colors.light.white, borderTopColor: colors.light.borderLight, borderTopWidth: 1, paddingTop: 21, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center' },
    content: {
        flex: 1,
        height: 65,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light.primary,
        borderRadius: 60
    },
});

export default TabBar;
