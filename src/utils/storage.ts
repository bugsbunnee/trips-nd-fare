import * as SecureStore from 'expo-secure-store';
import { AuthResponse } from '@/src/store/auth/actions';

const key = "trips-nd-fare-rider";

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

export default { storeUser, retrieveUser, removeUser };

