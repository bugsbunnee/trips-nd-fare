import React, { useEffect } from 'react';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { StyleSheet, Pressable, PressableProps, View } from 'react-native';

import { colors, icons } from '@/constants';

interface Props extends PressableProps {
  routeName: string;
  isFocused: boolean;
  color: string;
}

const TabBarButton: React.FC<Props> = ({ onLongPress, onPress, color, isFocused, routeName }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0)
  }, [isFocused, scale]);

  const iconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const backgroundColor = interpolateColor(scale.value, [0, 1], [colors.light.primary, colors.light.primaryLight]);

    return {
      backgroundColor,
      transform: [{ scale: scaleValue }]
    };
  }, [])

  return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tab}
      >
        <Animated.View style={[iconStyle, styles.content]}>
          {icons.TAB_ICONS[routeName as keyof typeof icons.TAB_ICONS]({ color })}
        </Animated.View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
    tab: {
         flex: 1,
        //  justifyContent: 'center',
        //  alignItems: 'center',
         gap: 5,
    },
    content: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    }
});

export default TabBarButton;
