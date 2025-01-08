import React from "react";
import { Stack } from "expo-router";

const MessagesLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
     );
};
 
export default MessagesLayout;