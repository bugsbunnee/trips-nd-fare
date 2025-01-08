
import React from "react";

import { StyleSheet, View } from "react-native";
import { Skeleton } from "@/components/ui";

const AvailableRiderSkeleton: React.FC = () => {
    return ( 
        <View style={styles.container}>
            <Skeleton style={styles.image} />

            <View style={styles.topMargin}>
                <Skeleton style={styles.name} />

                <View style={[styles.row, styles.topMargin]}>
                    <Skeleton style={styles.location} />
                    <Skeleton style={styles.distance} />
                </View>
            </View>
        </View>
     );
};

const styles = StyleSheet.create({
    container: { width: 129, marginRight: 16 },
    distance: {
        width: 30,
        height: 8,
    },
    image: { height: 138, width: "100%", borderRadius: 8 },
    name: {
        width: "100%",
        height: 8,
    },
    location: {
        width: 50,
        height: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    topMargin: { marginTop: 8 },
});
 
export default AvailableRiderSkeleton;