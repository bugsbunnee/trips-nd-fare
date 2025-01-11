import { GoogleSignin, isErrorWithCode, isSuccessResponse } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: 'autoDetect'
    });
};

export const signInWithGoogle = async  () => {
    try {
        const hasPlayServices = await GoogleSignin.hasPlayServices();
        if (!hasPlayServices) return { error: 'Google Play Services Unavailable!', data: null };
        
        const response = await GoogleSignin.signIn();
        if (!isSuccessResponse(response)) return { error: 'Something failed!', data: null };
            
        return { error: '', data: response.data }
    } catch (error) {
        if (isErrorWithCode(error)) return { error: error.code, data: null };

        return { error: (error as Error).message, data: null };
    }
};

export const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
};