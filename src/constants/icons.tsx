import React from 'react';
import { Foundation, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

export const SIZES = {
    SMALL: 16,
    NORMAL: 24,
    LARGE: 30,
    X_LARGE: 50,
    XX_LARGE: 110,
};

export const TAB_ICONS = {
    home: (props: { color: string; }) => <Foundation name='home' size={SIZES.LARGE} color={props.color} />,
    history: (props: { color: string; }) => <MaterialCommunityIcons name='newspaper' size={SIZES.LARGE} color={props.color} />,
    messages: (props: { color: string; }) => <Ionicons name='chatbubble-ellipses' size={SIZES.LARGE} color={props.color} />,
    profile: (props: { color: string; }) => <MaterialCommunityIcons name='account-circle-outline' size={SIZES.LARGE} color={props.color} />,
};

export default { SIZES, TAB_ICONS }
