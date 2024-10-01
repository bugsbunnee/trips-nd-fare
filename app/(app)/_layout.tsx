import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

const AppLayout = () => {
    return ( 
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
     );
};
 
export default AppLayout;