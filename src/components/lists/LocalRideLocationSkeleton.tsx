
import React from "react";
import { StyleSheet, View } from "react-native";

import { Skeleton } from "@/src/components/ui";
import { colors } from "@/src/constants";

const LocalRideLocationSkeleton: React.FC = () => {
    return (  
        <View style={styles.container}>
            <Skeleton style={styles.image} />

            <View style={{ marginTop: 6 }}>
                <Skeleton style={styles.label} />
                <Skeleton style={styles.sublabel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 6,
        alignSelf: 'flex-start',
        backgroundColor: colors.light.white,
        flex: 1,
        marginRight: 8,
        width: 129
    },
    image: { width: "100%", height: 91, borderRadius: 5 },
    label: {
        width: 20,
        height: 8,
        borderRadius: 2,
        marginBottom: 8,
    },
    sublabel: {
        width: 50,
        height: 8,
        borderRadius: 2,
        marginBottom: 8,
    },
});
 
export default LocalRideLocationSkeleton;