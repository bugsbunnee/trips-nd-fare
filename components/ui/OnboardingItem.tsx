import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { OnboardingSlide } from '@/utils/models';
import { styles as defaultStyles } from '@/constants';
import { APP_COLORS } from '@/constants/colors';
import { Text } from '@/components/ui';
import useThemeColor from '@/hooks/useThemeColor';

interface Props {
    item: OnboardingSlide;
    index: number;
    x: SharedValue<number>
}

const OnboardingItem: React.FC<Props> = ({ item,index, x }) => {
    const { text } = useThemeColor();
    const { width: SCREEN_WIDTH } = useWindowDimensions();
  
    const imageStyle = useAnimatedStyle(() => {
        const translateY = interpolate(x.value, [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH], [100, 0, 100], Extrapolation.CLAMP);
        const opacity = interpolate(x.value, [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH], [0, 1, 0], Extrapolation.CLAMP);
        
        return {
            opacity,
            height: SCREEN_WIDTH * 0.6,
            transform: [{ translateY}],
        };
    }, [index, x]);

    const textStyle = useAnimatedStyle(() => {
        const translateY = interpolate(x.value, [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH], [100, 0, 100], Extrapolation.CLAMP);
        const opacity = interpolate(x.value, [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH], [0, 1, 0], Extrapolation.CLAMP);
        
        return {
            opacity,
            transform: [{ translateY}],
        };
    }, [index, x]);

    return ( 
        <View style={[styles.container, { width: SCREEN_WIDTH }]}>
            <Animated.Image
                source={item.image}
                alt={item.title}
                style={[styles.image, imageStyle]}
            />
            
            <Animated.Text style={[styles.title, defaultStyles.title, textStyle]}>
                {item.title}
                {item.coloredText && <Animated.Text style={[styles.title, defaultStyles.title, textStyle, styles.coloredText]}>{item.coloredText}</Animated.Text>}
            </Animated.Text>
            
            <Animated.Text style={[styles.description, defaultStyles.body, textStyle]}>
                {item.description}
            </Animated.Text>
        </View>
     );
}

const styles = StyleSheet.create({
    coloredText: { color: APP_COLORS.PRIMARY },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 34,
    },
    image: { 
        width: '100%',
        resizeMode: 'contain',
    },
    description: {
        color: APP_COLORS.GRAY,
        textAlign: 'center',
        marginTop: 12
    },
    title: {
        marginTop: 34,
        textAlign: 'center'
    },
});
 
export default React.memo(OnboardingItem);