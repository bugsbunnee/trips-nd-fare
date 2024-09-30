import { useEffect, useState } from "react";
import { PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/auth/slice";

import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import storage from '@/utils/storage';


SplashScreen.preventAutoHideAsync();

const useInitializeApp = () => {
    const [isReady, setReady] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await Font.loadAsync({
                    PlusJakartaSansRegular: PlusJakartaSans_400Regular,
                    PlusJakartaSansMedium: PlusJakartaSans_500Medium,
                    PlusJakartaSansSemiBold: PlusJakartaSans_600SemiBold,
                    PlusJakartaSansBold: PlusJakartaSans_700Bold,
                    PlusJakartaSansExtraBold: PlusJakartaSans_800ExtraBold,
                });

                const user = await storage.retrieveUser();
                if (user) dispatch(setUser(user));
            } catch (error) {
                console.log(error);
            } finally {
                setReady(true);
            }
        };
        
        initializeApp();
    }, []);

    useEffect(() => {
        const hideSplash = async () => {
            await SplashScreen.hideAsync();
        };

        if (isReady) {
            hideSplash();
        }
    }, [isReady]);

    return isReady;
};
 
export default useInitializeApp;