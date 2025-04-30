import React from 'react';
import Modal from 'react-native-modal';

import { Button, Text } from '@/src/components/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { colors, icons } from '@/src/constants';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setBoardUser } from '@/src/store/auth/slice';

import storage from '@/src/utils/storage';

const AccountVerified: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleProceed = () => {
      storage.storeUser({
        account: auth.waitingRoom!.user,
        token: auth.waitingRoom!.token,
        chat: auth.waitingRoom!.chat,
        wallet: auth.waitingRoom!.wallet,
      });

      dispatch(setBoardUser());

      router.push('/home');
  };

  return (
    <Modal isVisible={auth.isVerified}>
        <View style={styles.content}>
            <MaterialCommunityIcons name='check-circle' color={colors.light.success} size={icons.SIZES.XX_LARGE} />
            <View style={styles.contentInner}>
                <Text type='subtitle' style={{ textAlign: 'center' }}>Verified!</Text>
                <Text type='default' style={styles.description}>You have successfully verified your account.</Text>
            </View>
            <Button label='Browse Home' onPress={handleProceed} />
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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