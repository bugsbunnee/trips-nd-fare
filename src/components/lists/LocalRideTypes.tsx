import React from "react";
import _ from "lodash";

import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setSelectedRideType } from "@/src/store/ride/slice";
import { colors, styles as defaultStyles } from "@/src/constants";
import { Skeleton, Text } from "../ui";

import Conditional from "../common/Conditional";

const LocalRideTypes: React.FC = () => {
    const data = useAppSelector((state) => state.data);
    const ride = useAppSelector((state) => state.ride);
    const dispatch = useAppDispatch();

    return ( 
        <>
            <Conditional visible={!data.isLoading}>
                {data.localRideTypes.map((rideType) => (
                    <TouchableOpacity 
                        onPress={() => dispatch(setSelectedRideType(rideType.value))}
                        key={rideType.value} 
                        style={[styles.rideType, ride.selectedRideType === rideType.value ? { backgroundColor: colors.light.primary } : { backgroundColor: colors.light.primaryLight }]}
                    >
                        <Text type="default-semibold" style={[styles.rideTypeText, ride.selectedRideType === rideType.value ? { color: colors.light.primaryLight } : { color: colors.light.primary }]}>{rideType.label}</Text>
                    </TouchableOpacity>
                ))}
            </Conditional>
            
            <Conditional visible={data.isLoading}>
                {_.range(1, 6).map((fill) => (
                    <Skeleton key={fill} style={styles.rideTypeSkeleton} />
                ))}
            </Conditional>
        </>
    );
};

const styles = StyleSheet.create({
    rides: { borderRadius: 20, marginTop: 18, paddingHorizontal: 11, paddingVertical: 24, backgroundColor: colors.light.white, zIndex: 100 },
    rideType: { 
        alignSelf: 'flex-start', 
        paddingHorizontal: 18, 
        paddingVertical: 3, 
        backgroundColor: colors.light.primaryLight, 
        borderRadius: 8,
        marginRight: 8
    },
    rideTypeSkeleton: { 
        width: 80,
        height: 20,
        borderRadius: 4,
        marginRight: 10
    },
    rideTypeText: {
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        fontSize: 18,
        lineHeight: 28,
        color: colors.light.primary,
        textTransform: 'capitalize'
    },
});
 
export default LocalRideTypes;