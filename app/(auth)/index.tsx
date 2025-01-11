import React, { useCallback, useState } from "react";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { ImageURISource, StyleSheet, View, ViewToken } from "react-native";
import { Link } from "expo-router";

import { OnboardingSlide } from "@/src/utils/models";
import { Text } from "@/src/components/ui";

import OnboardingItem from "@/src/components/ui/OnboardingItem";
import OnboardingCTAButton from "@/src/components/ui/OnboardingCTAButton";
import PaginationDot from "@/src/components/ui/PaginationDot";
import Screen from "@/src/components/navigation/Screen";

interface ListItem { 
    item: OnboardingSlide; 
    index: number; 
}

const SLIDES: OnboardingSlide[] = [
    {
    coloredText: 'ClickRide',
      title: 'The best car in your hands with ',
      description: 'Discover the convenience of finding your perfect ride with our App',
      image: require('@/src/assets/images/danfo.png'),
    },
    {
      title: 'The perfect ride is just a tap away!',
      description: 'Your journey begins with ClickRide. Find your ideal ride effortlessly.',
      image: require('@/src/assets/images/onboarding_two.png'),
    },
    {
      title: 'Your ride, your way. Let\'s get started!',
      description: 'Enter your destination, sit back, and let us take care of the rest.',
      image: require('@/src/assets/images/onboarding.png'),
    },
];

const IndexPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const x = useSharedValue(0);
    const flatListRef = useAnimatedRef<Animated.FlatList<ImageURISource>>();
  
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        setCurrentIndex(viewableItems[0].index ?? 0);
    }, []);

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => x.value = event.contentOffset.x,
    });
  
    const renderItem = useCallback(({ item, index }: ListItem) => {
        return <OnboardingItem item={item} index={index} x={x} />;
    }, [x]);

    return (
      <Screen>
        <View style={styles.skip}>
            <Link href='/get-started'>
                <Text type='default-semibold'>Skip</Text>
            </Link>
        </View>

        <Animated.FlatList
            style={styles.container}
            ref={flatListRef}
            onScroll={handleScroll}
            horizontal
            scrollEventThrottle={16}
            pagingEnabled={true}
            data={SLIDES}
            keyExtractor={(_) => _.title.toString()}
            bounces={false}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
        />
        
        <View style={styles.bottomContainer}>
            {SLIDES.map((_, index) => <PaginationDot key={index} index={index} x={x} />)}
        </View>

        <OnboardingCTAButton flatListRef={flatListRef} currentIndex={currentIndex} length={SLIDES.length} />
      </Screen>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
    },
    skip: { justifyContent: 'flex-end', flexDirection: 'row', paddingHorizontal: 34 },
});

export default IndexPage;