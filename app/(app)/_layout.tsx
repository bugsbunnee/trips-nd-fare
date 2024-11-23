import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

const AppLayout: React.FC = () => {
    return ( 
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
     );
};
 
export default AppLayout;