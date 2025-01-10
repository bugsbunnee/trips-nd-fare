import React, { useCallback } from 'react';
import Animated, {  useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';

import { styles as defaultStyles } from '@/constants';
import { APP_COLORS } from '@/constants/colors';
import useThemeColor from '@/hooks/useThemeColor';

type Props = {
    currentIndex: number;
    length: number;
    flatListRef: any;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OnboardingCTAButton: React.FC<Props> = ({ currentIndex, flatListRef, length }) => {
    const colors = useThemeColor();
    const dimensions = useWindowDimensions();

    const buttonStyle = useAnimatedStyle(() => {
        return {
            width: currentIndex === length - 1 ? withSpring(dimensions.width * 0.9) : withSpring(dimensions.width * 0.8),
            height: 60,
        };
    }, [currentIndex, length]);

    const onPress = useCallback(() => {
        if (currentIndex === length - 1) return router.push('/get-started');
          
        flatListRef.current?.scrollToIndex({
            index: currentIndex + 1,
        });
    }, [currentIndex]);

    return ( 
        <View style={styles.container}>
            <AnimatedPressable style={[styles.button, buttonStyle]} onPress={onPress}>
                <Animated.Text style={[defaultStyles.body, styles.text]}>
                    {currentIndex === (length - 1) ? 'Get started' : 'Next'}
                </Animated.Text>
            </AnimatedPressable>
        </View>
     );
};

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40,  
        padding: 34,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 100,
        backgroundColor: APP_COLORS.PRIMARY
    },
    text: {
        color: APP_COLORS.WHITE,
        textTransform: 'capitalize'
    }
});
  
export default OnboardingCTAButton;