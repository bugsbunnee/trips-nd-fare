import { Stack } from "expo-router";

const HomeLayout = () => {
    return ( 
        <Stack screenOptions={{ animation: 'flip', headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="book" />
            <Stack.Screen name="ride" />
        </Stack>
     );
};
 
export default HomeLayout;