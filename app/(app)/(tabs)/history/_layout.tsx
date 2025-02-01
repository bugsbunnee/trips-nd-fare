import React from "react";
import { Stack } from "expo-router";

const HistoryLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="upcoming" />
        </Stack>
     );
};
 
export default HistoryLayout;