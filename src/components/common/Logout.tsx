
import React, { useCallback } from "react";

import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAppDispatch } from "@/src/store/hooks";
import { logout } from "@/src/store/auth/slice";
import { colors, icons } from "@/src/constants";

const Logout: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/');
    }, [dispatch]);

    return ( 
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <MaterialCommunityIcons 
            name='logout' 
            size={icons.SIZES.NORMAL} 
            color={colors.light.primary} 
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logout: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light.white, borderRadius: 40 },
});
 
export default Logout;