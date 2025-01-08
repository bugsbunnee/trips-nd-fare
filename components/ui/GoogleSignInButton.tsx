import React from 'react';

import * as Linking from 'expo-linking';
import * as Google from 'expo-auth-session/providers/google';

import { StyleSheet, TouchableOpacity } from 'react-native';

import { Image, Text } from '.';
import { APP_COLORS } from '@/constants/colors';
import { AuthUser } from '@/utils/models';
import { useAppDispatch } from '@/store/hooks';
import { loginWithGoogle } from '@/store/auth/actions';

interface Props {
    label: string;
}

const GoogleSignInButton: React.FC<Props> = ({ label }) => {
    const dispatch = useAppDispatch();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_KEY,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_KEY,
    })

    const handleGoogleSignIn = async () => {
        try {
            const result = await promptAsync();
            if (result.type === 'success') {
                const token = result.authentication!.accessToken;
                const action = await dispatch(loginWithGoogle(token)).unwrap();
                console.log(action);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return ( 
        <TouchableOpacity style={[styles.button]} onPress={handleGoogleSignIn}>
            <Image 
                contentFit='contain' 
                src={require('@/assets/images/google.png')} 
                alt='Google' 
                style={styles.image} 
            />

            <Text type='default-semibold' style={styles.text}>
                {label}
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
        marginRight: 10
    },
    text: {
        color: APP_COLORS.DARK,
        textTransform: 'capitalize'
    }
});
 
export default GoogleSignInButton;
