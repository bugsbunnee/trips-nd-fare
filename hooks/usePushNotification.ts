import { Platform } from 'react-native';
import { useEffect } from 'react';

import { colors } from '@/constants';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const usePushNotification = () => { 
    useEffect(() => {
        const getPushToken = async () => {
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: colors.light.primaryLight,
                });
            }
        
            if (!Device.isDevice) {
                return;
            }
        
            let permission = await Notifications.getPermissionsAsync();
            if (!permission.granted) {
                permission = await Notifications.requestPermissionsAsync();
                if (!permission.granted) return;
            }
        
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) return;
        
            try {
                const result = await Notifications.getExpoPushTokenAsync({ projectId });
                const token = result.data;
            } catch (e: unknown) {
                // silent error;
            }
        };

        getPushToken();
    }, []);

    return null;
};
 
export default usePushNotification;



