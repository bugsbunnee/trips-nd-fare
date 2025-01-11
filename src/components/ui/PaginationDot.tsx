import React from 'react';
import Animated, { interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { APP_COLORS } from '@/src/constants/colors';

interface Props {
    index: number;
    x: SharedValue<number>;
}

const PaginationDot: React.FC<Props> = ({ index, x }) => {
    const { width } = useWindowDimensions();
    
    const itemStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(x.value, [(index - 1) * width, index * width, (index + 1) * width,], [APP_COLORS.GRAY_MID, APP_COLORS.PRIMARY, APP_COLORS.GRAY_MID]);

        return { backgroundColor: backgroundColor };
    }, [x]);

    return <Animated.View style={[styles.dot, itemStyle]} />;
};

const styles = StyleSheet.create({
    dot: {
        width: 32,
        height: 4,
        borderRadius: 2,
    }
})
 
export default PaginationDot;