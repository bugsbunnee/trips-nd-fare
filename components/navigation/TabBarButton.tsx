import React, { useCallback } from 'react';
import Animated from 'react-native-reanimated';

import { StyleSheet, Pressable, PressableProps } from 'react-native';
import { colors, icons } from '@/constants';

import useFluidButtonStyle from '@/hooks/useFluidButtonStyle';

interface Props extends PressableProps {
  routeName: string;
  isFocused: boolean;
  color: string;
}

const TabBarButton: React.FC<Props> = ({ onLongPress, onPress, color, isFocused, routeName }) => {
  const style = useFluidButtonStyle({ 
    triggerAnimation: isFocused, 
    colorList: [colors.light.primary, colors.light.primaryLight],
  });

  return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tab}
      >
        <Animated.View style={[style, styles.content]}>
          {icons.TAB_ICONS[routeName as keyof typeof icons.TAB_ICONS]({ color })}
        </Animated.View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    content: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50
    }
});

export default TabBarButton;
