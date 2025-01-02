import React from 'react';
import * as Linking from 'expo-linking';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';

import Image from './Image';

import { APP_COLORS } from '@/constants/colors';
import { AuthUser } from '@/utils/models';



import Text from './Text';

interface Props {
    label: string;
}


const GoogleSignInButton: React.FC<Props> = ({ label }) => {
    const oauth = useOAuth({ strategy: 'oauth_google' });

    const handleRegistration = (authUser: AuthUser) => {
        console.log(authUser);
    };
    
    const handleAuthentication = (authUser: AuthUser) => {
        console.log(authUser);
    };

    const handleGoogleSignIn = async () => {
        const redirectUrl = await Linking.createURL('/home');
        const authFlow = await oauth.startOAuthFlow({ redirectUrl });
        
       if (authFlow.createdSessionId) {
            if (authFlow.signUp && authFlow.signUp.createdUserId) {
                const auth = {
                    email: authFlow.signUp.emailAddress!,
                    firstName: authFlow.signUp.firstName!,
                    lastName: authFlow.signUp.lastName!,
                    sessionId: authFlow.signUp.createdUserId,
                };

                return handleRegistration(auth);
            };

            console.log(authFlow.signIn);
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
