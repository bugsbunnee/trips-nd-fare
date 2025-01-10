import React from "react";

import { Redirect, Stack } from "expo-router";
import { setInitializing } from "@/store/auth/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Splash from "@/components/ui/Splash";

const AuthLayout: React.FC = () => {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    if (auth.isInitializing) {
        return <Splash onDone={() => dispatch(setInitializing(false))} />;
    }

    if (auth.user) {
        return <Redirect href='/home' />
    }

    return ( 
        <Stack initialRouteName="index" screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="get-started" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
        </Stack>
     );
};
 
export default AuthLayout;