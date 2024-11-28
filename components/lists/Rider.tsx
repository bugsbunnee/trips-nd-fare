import React from 'react';

import { View,  StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, icons } from '@/constants';
import { Text } from '@/components/ui';
import { UserRide } from '@/utils/models';
import { formatAmount } from '@/utils/lib';

import car from '@/assets/images/car.png';

interface Props {
    uri: string;
    name: string;
    rating: number;
    price: number;
    type: UserRide['type'];
    numberOfSeats: number;
    timeToLocation: string;
    isSelected: boolean;
    onSelect: () => void;
}

const Rider: React.FC<Props> = ({ uri, name, rating, price, type, numberOfSeats, timeToLocation, isSelected, onSelect }) => {
    return ( 
        <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onPress={onSelect}>
            <Image source={{ uri }} alt={name} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.topContent}>
                    <Text type='default-semibold' style={styles.name} numberOfLines={1}>{name}</Text>
                    <MaterialCommunityIcons name='star' color={colors.light.primary} size={icons.SIZES.SMALL} />
                    <Text type='default' style={styles.rating}>{rating}</Text>
                </View>
                <View style={styles.bottomContent}>
                    <Text type='default' style={styles.price}>{formatAmount(price)}</Text>
                    <View style={styles.separator} />
                    <Text type='default' style={styles.time}>{timeToLocation}</Text>
                    <View style={styles.separator} />
                    <Text type='default' style={styles.time}>{numberOfSeats} Seats</Text>
                </View>
            </View>

            <Image source={car} alt={type} style={styles.ride} />
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    bottomContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 },
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 12, paddingVertical: 21, paddingHorizontal: 16 },
    content: { flex: 1 },
    image: { width: 44, height: 44, borderRadius: 44, contentFit: 'cover' },
    name: { color: colors.light.dark, fontSize: 15, lineHeight: 20, marginRight: 6, textTransform: 'capitalize' },
    price: { color: colors.light.dark, fontSize: 11, lineHeight: 16 },
    rating: { color: colors.light.dark, fontSize: 11, lineHeight: 16, marginLeft: 2 },
    ride: { width: 72, height: 40, contentFit: 'contain' },
    separator: { width: 1, height: 14, backgroundColor: colors.light.placeholder, marginHorizontal: 12 },
    selected: { backgroundColor: colors.light.primaryLight },
    time: { color: colors.light.gray, fontSize: 11, lineHeight: 16 },
    topContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
});

export default Rider;