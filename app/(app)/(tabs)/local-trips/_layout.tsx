import React from "react";
import { Stack } from "expo-router";

const LocalTripsLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[rider]" getId={() => Date.now().toString()} />
            <Stack.Screen name="location/[id]" getId={() => Date.now().toString()} />
            <Stack.Screen name="location/[...details]" getId={() => Date.now().toString()} />
        </Stack>
     );
};
 
export default LocalTripsLayout;