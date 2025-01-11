import React, { useEffect } from "react";
import { Stack } from "expo-router";

import { useAppDispatch } from "@/src/store/hooks";
import { getBusTickets } from "@/src/store/data/actions";

const BookingLayout: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBusTickets());
    }, [dispatch]);

    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="tickets" />
            <Stack.Screen name="local-trips" />
        </Stack>
     );
};
 
export default BookingLayout;