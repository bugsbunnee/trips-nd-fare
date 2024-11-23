import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getCoords } from '@/utils/lib';

import * as Device from 'expo-device';
import * as Location from 'expo-location';

interface Coords extends Location.LocationObjectCoords {
  latitudeDelta: number;
  longitudeDelta: number;
}

function useLocation() {
  const [coords, setCoords] = useState<Coords>();

  useEffect(() => {
    async function requestPermission() {
        if (Platform.OS === 'android' && !Device.isDevice) return;

        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') return;

        const fetchedLocation = await Location.getCurrentPositionAsync();
        setCoords(getCoords(fetchedLocation.coords));
    }

    requestPermission();
  }, []);

  return coords;
}

export default  useLocation;
