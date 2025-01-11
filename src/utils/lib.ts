import React from "react";
import { ApiErrorResponse } from 'apisauce';

import { NotificationContentInput, scheduleNotificationAsync } from "expo-notifications";
import { LocationObjectCoords } from "expo-location";
import { captureRef } from 'react-native-view-shot';

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { CURRENCY } from "@/src/constants/app";
import { colors } from "@/src/constants";
import { Location, Transaction } from "./models";

dayjs.extend(duration);

export const excludeStateKeyword = (text: string) => {
    return text.toLowerCase().replace('state', '').trim();
};

export const formatDate = (date: string | number |  Date, format: string = 'DD MMMM YYYY, HH:mm a') => {
    return dayjs(date).format(format);
};

export const formatAmount = (amount: number) => {
    if (isNaN(amount)) return 'N/A';
    
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY.NGN.CODE, unitDisplay: 'narrow' }).format(amount);
    return formattedAmount.replace(CURRENCY.NGN.CODE, CURRENCY.NGN.SYMBOL);
};

export const getCountDown = (startDate: string | Date | number, endDate: string | Date | number) => {
    const endTime = new Date(endDate).getTime();
    const startTime = new Date(startDate).getTime();

    const timeDifference = endTime - startTime;

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export const getCoords = ({ latitude, longitude, accuracy, speed, ...others }: LocationObjectCoords & Location) => {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latitudeDelta = accuracy! / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = accuracy! / (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
  
    return {
      ...others,
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
      accuracy,
      speed,
    };
};

export const getFieldErrorsFromError = (error: unknown) => {
    const parsedError: any = error;
   
    if (parsedError.response && parsedError.response.data && parsedError.response.data.fieldErrors) {
        return parsedError.response.data.fieldErrors;
    }

    return null;
};

export const getMessageFromError = (error: any) => {
    if (error) {
        if (error.response && error.response.data) {
            return error.response.data.message;
        }

        if (error.error) {
            return error.error;
        }
    }

    return '';
};

export const getTimeFromDate = (date: string | Date | number) => {
    return dayjs(date).format('HH:mm');
}

export const getLocationCode = (location: string) => {
    return location.substring(0, 3).toUpperCase();
};

export const generateScreenshot = (view: number | React.RefObject<unknown>) => {
    return captureRef(view, {
        quality: 1,
        format: 'png',
    })
};

export const getTransactionStatusColors = (status: Transaction['status']) => {
    switch(status) {
        case 'success':
            return {
                bg: colors.light.successMid,
                text: colors.light.successDark
            };
        
        case 'failed':
            return {
                bg: colors.light.dangerLight,
                text: colors.light.danger
            };
        
        case 'pending':
            return {
                bg: colors.light.primaryLight,
                text: colors.light.primary
            };
    
        default:
            return {
                bg: colors.light.successMid,
                text: colors.light.successDark
            };
    }
};

export const parseTime = (time: string, format: dayjs.OptionType) => {
    return dayjs(time, format).toString();
};

export const sendLocalNotification = (content: NotificationContentInput) => {
    scheduleNotificationAsync({ content, trigger: null });
};

