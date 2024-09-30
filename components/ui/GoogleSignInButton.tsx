import React from 'react';

import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { APP_COLORS } from '@/constants/colors';

import Text from './Text';

interface Props {
}

const GoogleSignInButton: React.FC<Props> = ({  }) => {
    return ( 
        <TouchableOpacity style={[styles.button]}>
            <Image source={require('@/assets/images/google.png')} alt='Google' style={styles.image} />
            <Text type='default-semibold' style={styles.text}>
                Login with Google
            </Text>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: APP_COLORS.GRAY_LIGHT,
        backgroundColor: APP_COLORS.WHITE
    },
    image: { 
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10
    },
    text: {
        color: APP_COLORS.DARK,
        textTransform: 'capitalize'
    }
});
 
export default GoogleSignInButton;
