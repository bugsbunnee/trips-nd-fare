import React from "react";
import { Stack } from "expo-router";

import usePushNotification from "@/src/hooks/usePushNotification";
import ChatWrapper from "@/src/components/common/ChatWrapper";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

const AppLayout: React.FC = () => {
    usePushNotification();

    return ( 
        <ChatWrapper>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ChatWrapper>
     );
};
 
export default AppLayout;