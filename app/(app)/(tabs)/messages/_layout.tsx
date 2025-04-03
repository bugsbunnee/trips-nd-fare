import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: 'index',
};

const MessagesLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="channel" getId={() => Date.now().toString()} />
            <Stack.Screen name="thread" getId={() => Date.now().toString()} />
        </Stack>
     );
};
 
export default MessagesLayout;