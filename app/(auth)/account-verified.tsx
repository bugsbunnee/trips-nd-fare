import Animated, { ZoomIn, SlideInDown } from 'react-native-reanimated';

import { Button, Text } from '@/components/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { APP_COLORS } from '@/constants/colors';
import { icons } from '@/constants';

const AccountVerified = () => {
  return (
    <Animated.View entering={ZoomIn} style={styles.container}>
      <Link href='/' asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>

      <Animated.View entering={SlideInDown} style={styles.content}>
        <MaterialCommunityIcons name='check-circle' color={APP_COLORS.SUCCESS} size={icons.SIZES.X_LARGE} />
        <View style={styles.contentInner}>
          <Text type='subtitle' style={{ textAlign: 'center' }}>Verified!</Text>
          <Text type='default' style={styles.description}>You have successfully verified your account.</Text>
        </View>
        <Button label='Browse Home' onPress={() => router.push('/home')} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_COLORS.MODAL_OPAQUE,
    },
    content: {
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    contentInner: { maxWidth: 250, marginTop: 40 },
    description: {
      marginTop: 10,
      marginBottom: 40
    }
});

export default AccountVerified