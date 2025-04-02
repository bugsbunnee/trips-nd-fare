
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Channel, Thread } from "stream-chat-expo";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setThread } from '@/src/store/data/slice';

import { colors, styles as defaultStyles, icons } from '@/src/constants';
import { Text } from '@/src/components/ui';

import Logout from '@/src/components/common/Logout';
import Screen from '@/src/components/navigation/Screen';

const ThreadPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);

  return (
    <Screen style={styles.screen}>
      <View style={styles.rowBetween}>
          <Text type='subtitle' style={styles.greeting}>Message List</Text>
          <Logout />
      </View>

      {data.channel && data.thread && (
          <Channel channel={data.channel} thread={data.thread} threadList keyboardVerticalOffset={0}>
            <Thread onThreadDismount={() => dispatch(setThread(null))} />
          </Channel>
      )}
    </Screen>
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
    rowBetween: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    screen: { backgroundColor: colors.light.white, padding: 16, flex: 1 },
    title: {
      fontSize: 28,
      fontFamily: defaultStyles.jakartaBold.fontFamily,
      textAlign: 'center',
      lineHeight: 33,
      color: '#212121'
    },
});

export default ThreadPage;
