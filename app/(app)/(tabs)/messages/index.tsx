
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { colors, styles as defaultStyles, icons } from '@/constants';
import { Text } from '@/components/ui';

import Logout from '@/components/common/Logout';
import Screen from '@/components/navigation/Screen';
import EmptyItem from '@/components/lists/EmptyItem';

const MessagesHomePage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <Screen style={styles.screen}>
      <FlatList
          data={[]}
          keyboardShouldPersistTaps='always'
          keyExtractor={(item) => item}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => null}
          ListHeaderComponent={() => (
            <View style={styles.rowBetween}>
                <Text type='subtitle' style={styles.greeting}>Chat List</Text>
                <Logout />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyItem 
              src={require('@/assets/images/message.png')}
              label='No Messages Yet' 
              description='No messages in your inbox, yet!' 
            />
          )}
      />
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

export default MessagesHomePage;
