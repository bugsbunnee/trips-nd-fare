import React from "react";
import { Stack } from "expo-router";

import usePushNotification from "@/hooks/usePushNotification";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

const AppLayout: React.FC = () => {
    usePushNotification();

    return ( 
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
     );
};
 
export default AppLayout;