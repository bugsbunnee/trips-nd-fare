import React from "react";
import { Stack } from "expo-router";

const ProfileLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'slide_from_left', headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
     );
};
 
export default ProfileLayout;