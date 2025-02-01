import React, { useCallback, useEffect } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import _ from 'lodash';

import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { ExpandingDot } from "react-native-animated-pagination-dots";

import Conditional from "@/src/components/common/Conditional";
import DashboardTrips from '@/src/components/lists/DashboardTrip';
import Screen from "@/src/components/navigation/Screen";

import { Notification, Skeleton, Text } from "@/src/components/ui";
import { colors, styles as defaultStyles } from "@/src/constants";
import { formatAmount } from "@/src/utils/lib";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { getServices } from "@/src/store/data/actions";


const HomeIndexPage: React.FC = () => {
    const { height, width } = useWindowDimensions();

    const progress = useSharedValue(0);
    const ref = React.useRef<ICarouselInstance>(null);
    
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const data = useAppSelector((state) => state.data);

    const handleFetchServices = useCallback(() => {
        dispatch(getServices());
    }, [dispatch]);

    useEffect(() => {
        handleFetchServices();
    }, [handleFetchServices]);
   
    return ( 
      <Screen style={styles.container}>
          <View style={[styles.header, { height: height * 0.18 }]}>
            <View style={styles.rowBetween}>
                <Text type='subtitle' style={styles.greeting}>Welcome, {auth.user!.firstName}</Text>

                <View style={styles.headerRight}>
                    <View style={styles.balance}>
                        <Text type='default-semibold' style={styles.balanceText}>{formatAmount(6000)}</Text>
                    </View>

                    <Notification />
                </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.news}>
                <Carousel
                    ref={ref}
                    style={styles.carousel}
                    loop
                    snapEnabled
                    pagingEnabled
                    autoPlay
                    autoPlayInterval={5000}
                    width={width * 0.925}
                    data={news}
                    onProgressChange={value => progress.set(value)}
                    renderItem={({item }) => (
                        <View style={styles.card}>
                            <View style={styles.cardDetails}>
                                <Text type='default' style={styles.cardTitle}>{item.title} <Text type='default-semibold' style={styles.cardTitleBold}>{item.cta}</Text></Text>
                                <Text type='default' style={styles.cardDescription}>{item.description}</Text>
                                <TouchableOpacity style={styles.cardButton} onPress={() => router.push('/home/book')}>
                                    <Text type='default-semibold' style={styles.cardButtonText}>{item.button}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardImageContainer}>
                                <Image 
                                    source={require('@/src/assets/images/home-cta.png')}
                                    style={styles.cardImage}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={styles.flex}>
                <Text type="subtitle" style={styles.subtitle}>Explore seamless ways to move around</Text>

                <Conditional visible={data.isLoading}>
                    <ScrollView bounces={false} showsHorizontalScrollIndicator={false} horizontal>
                        {_.range(1, 4).map((fill, index) => (
                            <View key={fill} style={[styles.ctaSkeleton, (index + 1) % 2 === 0 ? styles.horizontalMargin : undefined]}>
                                <Skeleton style={styles.ctaSkeletonTitle} />     
                                <Skeleton style={styles.ctaSkeletonText} />   
                                <View style={styles.ctaImageContainer}> 
                                    <Skeleton style={styles.ctaSkeletonImage} />     
                                </View>  
                            </View>
                        ))}
                    </ScrollView>
                </Conditional>

                <Conditional visible={!data.isLoading}>
                    <FlatList 
                        refreshing={data.isLoading}
                        onRefresh={handleFetchServices}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={data.services}
                        snapToAlignment="start"
                        pagingEnabled
                        keyExtractor={(item) => item.name}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                onPress={() => router.push(item.route as any)}
                                style={[styles.cta, { backgroundColor: item.color }]}
                            >
                                <Text type='default-semibold' style={styles.ctaTitle}>{item.name}</Text>
                                <Text type='default' style={styles.ctaDescription}>{item.description}</Text>
                                
                                <View style={styles.ctaImageContainer}>
                                    <Image src={item.image} style={styles.ctaImage} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </Conditional>

                <Text type="subtitle" style={styles.subtitle}>Trips</Text>

                <DashboardTrips />
            </View>
          </View>
      </Screen>
    );
};

const news = [
    {
        title: 'Are you ready for a',
        cta: 'smooth ride?',
        description: 'Sit back, relax and enjoy rides from your comfort.',
        button: 'Ride with ClickRide',
        img: require('@/src/assets/images/home-cta.png'),
    },
    {
        title: 'Get the most',
        cta: 'affordable rates',
        description: 'Sit back, relax and enjoy rides from your comfort.',
        button: 'Ride with ClickRide',
        img: require('@/src/assets/images/home-cta.png'),
    },
];

const styles = StyleSheet.create({
    balance: { backgroundColor: colors.light.white, paddingVertical: 5, paddingHorizontal: 7, borderRadius: 11 },
    balanceText: { 
        fontSize: 15, 
        lineHeight: 18, 
        color: colors.light.black,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
    },
    body: { flex: 1, zIndex: 1, elevation: 0, backgroundColor: colors.light.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 16 },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    card: { 
        width: '100%', 
        height: '100%',
        padding: 16,
        gap: 4,
        backgroundColor: colors.light.input,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
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
    carousel: { width: '100%', height: '100%', minHeight: 160, marginTop: -90 }, 
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
    ctaSkeleton: {
        borderRadius: 8,
        width: 112,
        padding: 11,
        backgroundColor: colors.light.dew,
    },
    ctaSkeletonImage: { 
        width: 76, 
        height: 47,
        borderRadius: 8, 
    },
    ctaSkeletonTitle: { 
        width: '100%', 
        height: 15, 
        borderRadius: 4, 
    },
    ctaSkeletonText: { 
        width: '100%', 
        height: 8,
        marginTop: 10, 
        borderRadius: 8, 
    },
    flex: {  },
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
    horizontalMargin: { marginHorizontal: 17 },
    news: { position: 'relative', marginBottom: 70 },
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
