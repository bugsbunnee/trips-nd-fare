import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthRequest } from 'expo-auth-session/providers/google';

import Image from '@/components/ui/Image';
import Text from '@/components/ui/Text';
import storage from '@/utils/storage';

import { APP_COLORS } from '@/constants/colors';
import { useAppDispatch } from '@/store/hooks';
import { loginWithGoogle } from '@/store/auth/actions';
import { getMessageFromError } from '@/utils/lib';

interface Props {
    label: string;
}

const GoogleSignInButton: React.FC<Props> = ({ label }) => {
    const dispatch = useAppDispatch();
    const [request, response, promptAsync] = useAuthRequest({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_WEB_KEY,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_ANDROID_KEY,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_IOS_KEY,
    })

    const handleGoogleSignIn = async () => {
        try {
            const result = await promptAsync();
            if (result.type !== 'success') return;

            const token = result.authentication!.accessToken;
            const action = await dispatch(loginWithGoogle(token)).unwrap();
            if (!action) return;
            
            storage.storeUser(action);
        } catch (error) {
            Alert.alert('Error', getMessageFromError(error));
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
