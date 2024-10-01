import { Stack } from "expo-router";

const AuthLayout = () => {
    return ( 
        <Stack initialRouteName="index" screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="get-started" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="account-verified" options={{ presentation: 'modal' }} />
        </Stack>
     );
};
 
export default AuthLayout;