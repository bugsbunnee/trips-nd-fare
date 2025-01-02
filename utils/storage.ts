import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';
import { AuthResponse } from '@/store/auth/actions';

const key = "trips-nd-fare-user";

const createTokenCache = (): TokenCache => {
    return {
      getToken: async (key: string) => {
        try {
          const item = await SecureStore.getItemAsync(key);
          return item;
        } catch (error) {
          await SecureStore.deleteItemAsync(key);
          return null
        }
      },
      saveToken: (key: string, token: string) => {
        return SecureStore.setItemAsync(key, token);
      },
    }
};

const storeUser = async (session: AuthResponse) => {
    try {
        await SecureStore.setItemAsync(key, JSON.stringify(session));
    } catch (error) {
        console.log('Error storing the user', error);
    }
};

const retrieveUser = async () => {
    try {
        const session =  await SecureStore.getItemAsync(key);
        if (session) return JSON.parse(session);

        return null;
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

const removeUser = async () => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error retrieving the user', error);
    }
};

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;
export default { storeUser, retrieveUser, removeUser };

