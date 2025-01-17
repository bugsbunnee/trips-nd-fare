import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: 'index',
};

const TrackLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ presentation: "modal" }} />
            <Stack.Screen name="[id]" getId={({ params }) => String(Date.now())} />
        </Stack>
     );
};
 
export default TrackLayout;