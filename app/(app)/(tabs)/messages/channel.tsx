
import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Channel, DefaultStreamChatGenerics, MessageInput, MessageList, MessageType } from "stream-chat-expo";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { setThread } from '@/src/store/data/slice';
import { colors, styles as defaultStyles, icons } from '@/src/constants';
import { Text } from '@/src/components/ui';

import Screen from '@/src/components/navigation/Screen';

const ChannelPage: React.FC = () => {
  const data = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();  

  const handleSelectThread = (thread: MessageType<DefaultStreamChatGenerics> | null) => {
    if (thread) {
      dispatch(setThread(thread));
      router.push('/messages/thread');
    }
  };

  return (
    <Screen style={[styles.screen, { paddingBottom: 60 }]}>
       <View style={styles.rowBetween}>
            <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                <MaterialCommunityIcons name="arrow-left"  size={icons.SIZES.NORMAL} color={colors.light.white} />
            </TouchableOpacity>

            <Text type='default-semibold' style={styles.greeting}>Chat</Text>
        </View>

      {data.channel && (
          <Channel channel={data.channel}>
              <MessageList onThreadSelect={handleSelectThread} />
              <MessageInput />
          </Channel>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
    button: { 
      width: 44,
      height: 44,
      borderRadius: 44,
      backgroundColor: colors.light.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyDetails: { marginTop: 48 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    flex: { flex: 1, },
    greeting: { 
      color: colors.light.dark, 
      letterSpacing: 0.25, 
      fontSize: 22,
      lineHeight: 26,
      fontFamily: defaultStyles.jakartaBold.fontFamily,
    },
    headerContainer: { height: '100%', width: '100%' },
    rowBetween: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-start', gap: 20, paddingHorizontal: 16, marginBottom: 10 },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    screen: { backgroundColor: colors.light.white, flex: 1 },
    title: {
      fontSize: 28,
      fontFamily: defaultStyles.jakartaBold.fontFamily,
      textAlign: 'center',
      lineHeight: 33,
      color: '#212121'
    },
});

export default ChannelPage;
