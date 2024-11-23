import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { styles as defaultStyles } from '@/constants';
import colors, { APP_COLORS } from '@/constants/colors';

import Text from './Text';

interface Props {
    disabled?: boolean;
    label: string;
    onPress: () => void;
}

const AppButton: React.FC<Props> = ({ disabled, label, onPress }) => {
    return ( 
        <TouchableOpacity disabled={disabled} style={[styles.button, disabled ? styles.disabled : defaultStyles.shadow]} onPress={onPress}>
            <Text type='default-semibold' style={styles.text}>
                {label}
            </Text>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        borderRadius: 100,
        backgroundColor: APP_COLORS.PRIMARY
    },
    disabled: {
        backgroundColor: colors.light.grayDeep,
    },
    text: {
        color: APP_COLORS.WHITE,
        textTransform: 'capitalize'
    }
});
 
export default AppButton;
