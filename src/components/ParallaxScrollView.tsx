import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import { ThemedView } from '@/src/components/ThemedView';
import { APP_COLORS } from '@/src/constants/colors';

type Props = PropsWithChildren<{
  headerHeight?: number;
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

function ParallaxScrollView({ children, headerImage, headerBackgroundColor, headerHeight = 284 }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const dimensions = useWindowDimensions();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={[styles.container, { minHeight: dimensions.height }]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { height: headerHeight },
            { backgroundColor: headerBackgroundColor.light },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: APP_COLORS.WHITE
  },
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: APP_COLORS.WHITE
  },
});

export default ParallaxScrollView;
