import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import _ from 'lodash';

import { getCoords } from '@/src/utils/lib';
import { useAppDispatch } from '@/src/store/hooks';
import { updateLocation } from '@/src/store/data/actions';
import { CoordinatesDelta } from '@/src/utils/models';

import * as Device from 'expo-device';
import * as Location from 'expo-location';


function useLocation() {
  const [coords, setCoords] = useState<CoordinatesDelta>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function requestPermission() {
        if (Platform.OS === 'android' && !Device.isDevice) return;

        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== 'granted') return;

        const fetchedLocation = await Location.getCurrentPositionAsync();
        const address = await Location.reverseGeocodeAsync(fetchedLocation.coords);

        setCoords(getCoords({
            ...fetchedLocation.coords,
            address: `${address[0].name} ${address[0].street}, ${address[0].country}`
        }));
    }

    requestPermission();
  }, []);

  useEffect(() => {
    async function uploadLocation() {
        if (!coords) return;

        const coordinates = _.pick(coords, ['latitude', 'longitude']);
        await dispatch(updateLocation(coordinates));
    }

    uploadLocation();
  }, [dispatch, coords]);

  return coords;
}

export default  useLocation;
