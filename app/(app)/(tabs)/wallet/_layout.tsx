import React from "react";
import { Stack } from "expo-router";

const WalletLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="account" />
            <Stack.Screen name="banks" />
            <Stack.Screen name="pending" />
            <Stack.Screen name="success" />
            <Stack.Screen name="setup" />
        </Stack>
     );
};
 
export default WalletLayout;