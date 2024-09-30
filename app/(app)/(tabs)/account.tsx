import { Text } from "@/components/ui";
import { colors } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BookRide = () => {
    const insets = useSafeAreaInsets();

    const auth = useAppSelector((state) => state.auth);

    return ( 
        <View style={[{ flex: 1, backgroundColor: '#F6F8FA' }, { paddingTop: insets.top }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text type='default-semibold' style={{ fontSize: 22, color: colors.light.dark }}>Welcome, </Text>

            </View>
        </View>
     );
}
 
export default BookRide;