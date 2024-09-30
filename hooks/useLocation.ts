import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import * as Device from 'expo-device';
import * as Location from 'expo-location';

function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    async function requestPermission() {
        if (Platform.OS === 'android' && !Device.isDevice) return;

        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') return;

        const fetchedLocation = await Location.getCurrentPositionAsync();
        setLocation(fetchedLocation);
    }

    requestPermission();
  }, []);

  return location;
}

export default  useLocation;
