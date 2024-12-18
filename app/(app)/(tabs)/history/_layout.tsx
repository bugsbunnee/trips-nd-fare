import React from "react";
import { Stack } from "expo-router";

const HistoryLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
     );
};
 
export default HistoryLayout;