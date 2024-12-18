import React from "react";

import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import DashboardTrips from '@/components/lists/DashboardTrip';
import Screen from "@/components/navigation/Screen";

import { Notification, Text } from "@/components/ui";
import { colors, styles as defaultStyles } from "@/constants";
import { formatAmount } from "@/utils/lib";


const CTAs = [
    { 
        backgroundColor: '#FFDCD4',
        title: 'Book a ride', 
        description: 'Order a ride from your home', 
        image: require('@/assets/images/book-ride.png') 
    },
    { 
        backgroundColor: '#D3E8D9',
        title: 'Buy Bus Ticket', 
        description: 'Book your bus ticket from the comfort of your home', 
        image: require('@/assets/images/bus.png') 
    },
    { 
        backgroundColor: '#E8E8D3',
        title: 'Local Trips', 
        description: 'Call a local rider from around your area', 
        image: require('@/assets/images/keke.png') 
    },
    { 
        backgroundColor: '#E8DED3',
        title: 'Train', 
        description: 'Book your train services', 
        image: require('@/assets/images/train.png') 
    },
    { 
        backgroundColor: '#71C3FF',
        title: 'Ferry', 
        description: 'Buy your ferry ticket', 
        image: require('@/assets/images/ferry.png') 
    },
];

const HomeIndexPage: React.FC = () => {
    const { height } = useWindowDimensions();
   
    return ( 
      <Screen style={styles.container}>
          <View style={[styles.header, { height: height * 0.18 }]}>
            <View style={styles.rowBetween}>
                <Text type='subtitle' style={styles.greeting}>Welcome, Joseph</Text>

                <View style={styles.headerRight}>
                    <View style={styles.balance}>
                        <Text type='default-semibold' style={styles.balanceText}>{formatAmount(6000)}</Text>
                    </View>

                    <Notification hasUnread />
                </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.card}>
                <View style={styles.cardDetails}>
                    <Text type='default' style={styles.cardTitle}>Are you ready for a <Text type='default-semibold' style={styles.cardTitleBold}>smooth ride?</Text></Text>
                    <Text type='default' style={styles.cardDescription}>Sit back, relax and enjoy rides from your comfort.</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/home/book')}>
                        <Text type='default-semibold' style={styles.cardButtonText}>Ride with ClickRide</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardImageContainer}>
                    <Image 
                        source={require('@/assets/images/home-cta.png')}
                        style={styles.cardImage}
                    />
                </View>
            </View>
            <View>
                <Text type="subtitle" style={styles.subtitle}>Explore seamless ways to move around</Text>

                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={CTAs}
                    snapToAlignment="start"
                    pagingEnabled
                    keyExtractor={(item) => item.title}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => router.push('/home/book')}
                            style={[styles.cta, { backgroundColor: item.backgroundColor }]}
                        >
                            <Text type='default-semibold' style={styles.ctaTitle}>{item.title}</Text>
                            <Text type='default' style={styles.ctaDescription}>{item.description}</Text>
                            
                            <View style={styles.ctaImageContainer}>
                                <Image source={item.image} style={styles.ctaImage} />
                            </View>
                        </TouchableOpacity>
                    )}
                />

                <Text type="subtitle" style={styles.subtitle}>Trips</Text>

                <DashboardTrips />
            </View>
          </View>
      </Screen>
    );
};

const styles = StyleSheet.create({
    balance: { backgroundColor: colors.light.white, paddingVertical: 5, paddingHorizontal: 7, borderRadius: 11 },
    balanceText: { 
        fontSize: 15, 
        lineHeight: 18, 
        color: colors.light.black,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    body: { flex: 1, zIndex: 1, elevation: 0, backgroundColor: colors.light.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 16 },
    card: { 
        width: '100%', 
        padding: 16,
        gap: 4,
        backgroundColor: colors.light.input,
        borderRadius: 10,
        marginTop: -90,
        flexDirection: "row",
    },
    cardButton: { padding: 10, backgroundColor: colors.light.primary, marginTop: 10, borderRadius: 8, alignSelf: 'flex-start' },
    cardButtonText: { 
        color: colors.light.text, 
        fontSize: 10, 
        lineHeight: 12, 
        letterSpacing: 0.25,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    cardDescription: { 
        fontSize: 10, 
        lineHeight: 12, 
        color: colors.light.graySemi, 
        marginTop: 4, 
        textAlign: 'left',
        fontWeight: defaultStyles.urbanistRegular.fontWeight,
        fontFamily: defaultStyles.urbanistRegular.fontFamily,
    },
    cardDetails: { flex: 1 },
    cardImageContainer: { justifyContent: 'center', alignItems: 'center' },
    cardImage: { width: 137, height: 121, resizeMode: 'contain' },
    cardTitle: {
        fontSize: 18, 
        lineHeight: 21, 
        letterSpacing: 0.25, 
        color: colors.light.dark, 
        textAlign: 'left',
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
    cardTitleBold: { 
        fontSize: 22, 
        lineHeight: 30,
        color: colors.light.dark,
        fontFamily: defaultStyles.urbanistExtra.fontFamily,
    },
    container: { flex: 1, backgroundColor: colors.light.primary },
    cta: { 
        backgroundColor: '#FFDCD4',
        padding: 11,
        borderRadius: 8,
        width: 112
    },
    ctaDescription: { 
        textAlign: 'left', 
        marginTop: 10, 
        color: colors.light.dark, 
        fontSize: 8, 
        lineHeight: 10, 
        letterSpacing: 0.25,
        fontWeight: defaultStyles.urbanistRegular.fontWeight,
        fontFamily: defaultStyles.urbanistRegular.fontFamily,
    },
    ctaImage: { width: 76, height: 47, resizeMode: 'contain' },
    ctaImageContainer: { justifyContent: 'center', alignItems: 'flex-end', marginTop: 17 },
    ctaTitle: { 
        fontSize: 12, 
        lineHeight: 14, 
        letterSpacing: 0.25, 
        textTransform: 'capitalize',
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    greeting: { 
        color: colors.light.white, 
        fontSize: 22, 
        lineHeight: 26, 
        letterSpacing: 0.25,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    header: { 
        padding: 16,         
        zIndex: 10,
        elevation: 20 
    },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    separator: { width: 17 },
    subtitle: { 
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        color: colors.light.black, 
        marginTop: 24, 
        marginBottom: 14, 
        fontSize: 18, 
        lineHeight: 21, 
        maxWidth: 212 
    },
    tableRow: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, alignItems: 'center' },
    tableHeader: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, gap: 4, alignItems: 'center', backgroundColor: colors.light.primaryLight, marginBottom: 10 },
    tableHeaderActive: { paddingHorizontal: 11, paddingVertical: 5, backgroundColor: colors.light.primary, borderRadius: 4, flex: 1 },
    tableHeaderActiveText: { color: colors.light.white, fontSize: 14, lineHeight: 16, textAlign: 'center' },
    tableRowText: { color: colors.light.graySemi, fontSize: 14, lineHeight: 16, flex: 1, textAlign: 'center' }
});
 
export default HomeIndexPage;
