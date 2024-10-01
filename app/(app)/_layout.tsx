import { Redirect, Stack } from "expo-router";
import { useAppSelector } from "@/store/hooks";

const AppLayout = () => {
    const auth = useAppSelector((state) => state.auth)
    
    if (auth.isAuthenticating) {
        return null;
    }

    console.log(auth)

    if (!auth.user) {
        return <Redirect href='/(auth)/' />
    }

    return ( 
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
     );
}
 
export default AppLayout;