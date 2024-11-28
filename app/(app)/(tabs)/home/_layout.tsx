import React from "react";
import { Stack } from "expo-router";

const HomeLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="book" />
            <Stack.Screen name="ride" />
            <Stack.Screen name="choose-rider" />
            <Stack.Screen name="ride-information" />
        </Stack>
     );
};
 
export default HomeLayout;