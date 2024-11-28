import React from "react";
import { Stack } from "expo-router";

const TicketsLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" getId={() => Date.now().toString()} />
            <Stack.Screen name="receipt" />
            <Stack.Screen name="confirmation" options={{ presentation: "modal" }} />
        </Stack>
     );
};
 
export default TicketsLayout;