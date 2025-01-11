import React, { useEffect } from 'react';

import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthRequest } from 'expo-auth-session/providers/google';

import Image from '@/src/components/ui/Image';
import Text from '@/src/components/ui/Text';
import storage from '@/src/utils/storage';

import { APP_COLORS } from '@/src/constants/colors';
import { useAppDispatch } from '@/src/store/hooks';
import { loginWithGoogle } from '@/src/store/auth/actions';
import { getMessageFromError } from '@/src/utils/lib';

interface Props {
    label: string;
}

const GoogleSignInButton: React.FC<Props> = ({ label }) => {
    const dispatch = useAppDispatch();
    const [request, response, promptAsync] = useAuthRequest({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_WEB_KEY,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_KEY,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_KEY,
    });

    useEffect(() => {
        async function handleSignIn() {
            if (!response || response.type !== 'success') return;

            try {
                const token = response.authentication!.accessToken;
                const action = await dispatch(loginWithGoogle(token)).unwrap();
                if (!action) return;
                
                storage.storeUser(action);
            } catch (error) {
                Alert.alert('Error', getMessageFromError(error));
            }
        }

        handleSignIn();
    }, [response]);

    return ( 
        <TouchableOpacity style={[styles.button]} onPress={() => promptAsync()}>
            <Image 
                contentFit='contain' 
                src={require('@/src/assets/images/google.png')} 
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
