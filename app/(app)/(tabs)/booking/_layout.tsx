import React from "react";
import { Stack } from "expo-router";

const BookingLayout: React.FC = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="tickets" />
            <Stack.Screen name="local-trips" />
        </Stack>
     );
};
 
export default BookingLayout;