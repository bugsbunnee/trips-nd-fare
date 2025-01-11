
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { colors, styles as defaultStyles } from '@/src/constants';
import { Button, Image, Text } from '@/src/components/ui';
import { ImageSource } from 'expo-image';

interface Props {
    src?: ImageSource;
    label: string;
    description: string;
    onRefresh?: () => void;
}

const EmptyItem: React.FC<Props> = ({ src = require('@/src/assets/images/empty.png'), label, description, onRefresh }) => {
    const dimensions = useWindowDimensions();
    
    return ( 
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    contentFit='contain'
                    src={src} 
                    style={{ width: dimensions.width * 0.7, height: 115, }} 
                />
            </View>

            <View style={styles.topMargin}>
                <Text type='default-semibold' style={styles.title}>{label}</Text>
                <Text type='default' style={styles.description}>{description}</Text>
            </View>

            {onRefresh ? (
                <View style={[styles.topMargin, { width: '60%' }]}>
                    <Button label='Refresh' onPress={onRefresh} />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    description: {
      fontSize: 17,
      fontFamily: defaultStyles.jakartaMedium.fontFamily,
      textAlign: 'center',
      lineHeight: 24,
      color: colors.light.gray,
      marginTop: 10
    },
    topMargin: { marginTop: 48 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    flex: { flex: 1, },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 28,
      fontFamily: defaultStyles.jakartaBold.fontFamily,
      textAlign: 'center',
      lineHeight: 33,
      color: '#212121'
    },
});
 
export default EmptyItem;