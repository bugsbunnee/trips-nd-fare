import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<Props> = ({ children, style }) => {
    const insets = useSafeAreaInsets();

    const insetStyles = React.useMemo(() => {
        return {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }
    }, [insets]);

    return ( 
        <View style={[styles.container, insetStyles, style]}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </View>
     );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Screen;

