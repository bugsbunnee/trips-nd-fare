import React from "react";
import { Stack } from "expo-router";

const TicketsLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" getId={() => String(Date.now())} />
            <Stack.Screen name="receipt" />
        </Stack>
     );
};
 
export default TicketsLayout;