import { Stack } from "expo-router";

const AuthLayout = () => {
    return ( 
        <Stack  screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="get-started" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="account-verified" options={{ presentation: 'modal' }} />
        </Stack>
     );
};
 
export default AuthLayout;