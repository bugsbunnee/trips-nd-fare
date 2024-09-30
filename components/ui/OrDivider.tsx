import React from 'react';

import { StyleSheet, View } from 'react-native';
import { APP_COLORS } from '@/constants/colors';

import Text from '@/components/ui/Text';

const OrDivider = () => {
    return ( 
        <View style={styles.container}>
            <View style={styles.line} />
            <Text type='default-semibold' style={styles.text}>Or</Text>
            <View style={styles.line} />
        </View>
     );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: APP_COLORS.GRAY_LIGHT
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
        marginHorizontal: 16
    }
});
 
export default OrDivider;