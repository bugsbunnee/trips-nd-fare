import React, { PropsWithChildren, useEffect, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import _ from 'lodash';

import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants';



interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Skeleton: React.FC<Props> = ({ children, style }) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const opacity = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: interpolate(opacity.value, [0, 1], [-dimensions.width, dimensions.width]) }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        const timing = withTiming(1, { duration: 1000 });
        const repeat = withRepeat(timing, -1, true);
        
        opacity.set(repeat);
    }, []);

    return ( 
        <Animated.View style={[styles.container, style]} >
            <Animated.View style={[{ width: '80%', height: '100%' }, animatedStyles]} onLayout={(event) => setDimensions(_.pick(event.nativeEvent.layout, ['width', 'height']))}>
                <AnimatedLinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[{ width: '100%', height: '100%'}]}
                    colors={[
                        "rgba(255,255,255,0)",
                        "rgba(255,255,255,0.1)",
                        "rgba(255,255,255,0.4)",
                        "rgba(255,255,255,0.6)",
                        "rgba(255,255,255,0.7)",
                        "rgba(255,255,255,0.6)",
                        "rgba(255,255,255,0.4)",
                        "rgba(255,255,255,0.1)",
                        "rgba(255,255,255,0)",
                    ]}
                />
            </Animated.View>
                
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: colors.light.skeleton,
        position: 'relative',
        overflow: 'hidden',
        // flex: 1,
        // width: '100%',
        // height: '100%',
    }
});

export default Skeleton;