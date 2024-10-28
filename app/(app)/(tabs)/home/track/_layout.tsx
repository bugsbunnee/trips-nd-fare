import { Stack } from "expo-router";

const TrackLayout = () => {
    return ( 
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ presentation: "modal" }} />
            <Stack.Screen name="[id]" getId={({ params }) => String(Date.now())} />
        </Stack>
     );
};
 
export default TrackLayout;