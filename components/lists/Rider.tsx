import React from 'react';

import { View,  StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, icons } from '@/constants';
import { Image, Text } from '@/components/ui';
import { formatAmount } from '@/utils/lib';

import { NearbyRider } from '@/store/data/slice';

interface Props {
    rider: NearbyRider;
    isSelected: boolean;
    onSelect: () => void;
}

const Rider: React.FC<Props> = ({ rider, isSelected, onSelect }) => {
    return ( 
        <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onSelect}>
            <Image contentFit='cover' src={rider.profileDisplayImage} alt={rider.firstName} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.topContent}>
                    <Text type='default-semibold' style={styles.name} numberOfLines={1}>{rider.firstName}</Text>
                    <MaterialCommunityIcons name='star' color={colors.light.primary} size={icons.SIZES.SMALL} />
                    <Text type='default' style={styles.rating}>{rider.rating}</Text>
                </View>
                <View style={styles.bottomContent}>
                    <Text type='default' style={styles.price}>{formatAmount(rider.price)}</Text>
                    <View style={styles.separator} />
                    <Text type='default' style={styles.time}>{rider.timeToLocation}</Text>
                    <View style={styles.separator} />
                    <Text type='default' style={styles.time}>5 Seats</Text>
                </View>
            </View>

            <Image contentFit='contain' src={rider.serviceDisplayImage} alt={rider.firstName} style={styles.ride} />
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    bottomContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 },
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 12, paddingVertical: 21, paddingHorizontal: 16 },
    content: { flex: 1 },
    image: { width: 44, height: 44, borderRadius: 44 },
    name: { color: colors.light.dark, fontSize: 15, lineHeight: 20, marginRight: 6, textTransform: 'capitalize' },
    price: { color: colors.light.dark, fontSize: 11, lineHeight: 16 },
    rating: { color: colors.light.dark, fontSize: 11, lineHeight: 16, marginLeft: 2 },
    ride: { width: 72, height: 40 },
    separator: { width: 1, height: 14, backgroundColor: colors.light.placeholder, marginHorizontal: 12 },
    selected: { backgroundColor: colors.light.primaryLight },
    time: { color: colors.light.gray, fontSize: 11, lineHeight: 16 },
    topContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
});

export default Rider;