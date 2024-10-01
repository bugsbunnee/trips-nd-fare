import { useEffect } from "react";
import { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
    triggerAnimation: boolean;
    colorList: string[];
}

const useFluidButtonStyle = (props: Props) => {
    const scale = useSharedValue(0);

    useEffect(() => {
      scale.value = withSpring(props.triggerAnimation ? 1 : 0)
    }, [props.triggerAnimation, scale]);

    const style = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 0.8], [0.8, 1])
        const backgroundColor = interpolateColor(scale.value, [0, 1], props.colorList);
    
        return {
          backgroundColor,
          transform: [{ scale: scaleValue }]
        };
    }, [props])

    return style;
};
 
export default useFluidButtonStyle;