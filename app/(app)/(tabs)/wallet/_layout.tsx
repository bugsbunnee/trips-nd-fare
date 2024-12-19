import React from "react";
import { Stack } from "expo-router";

const WalletLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
     );
};
 
export default WalletLayout;