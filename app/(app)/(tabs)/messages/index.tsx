
import React, { useMemo } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import dayjs from 'dayjs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Channel, ChannelSort } from "stream-chat";
import { ChannelList, DefaultStreamChatGenerics, ChannelAvatar, MessageReadStatus } from "stream-chat-expo";
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { router } from 'expo-router';

import { setChannel } from '@/src/store/data/slice';
import { colors, styles as defaultStyles, icons } from '@/src/constants';
import { Image, Text } from '@/src/components/ui';

import EmptyItem from '@/src/components/lists/EmptyItem';
import Logout from '@/src/components/common/Logout';
import Screen from '@/src/components/navigation/Screen';

const sort: ChannelSort<DefaultStreamChatGenerics> = {
  last_message_at: -1,
};

const options = {
  presence: true,
  state: true,
  watch: true,
};

const Channels: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const filters = useMemo(() => {
    return {
      members: {
        '$in': [auth.user!._id]
      },
    };
  }, [auth.user]);

  const handleSelectChannel = (channel: Channel) => {
    dispatch(setChannel(channel));
    router.push('/messages/channel');
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text type='subtitle' style={styles.greeting}>Chat List</Text>
        <Logout />
      </View>

      <ChannelList
        filters={filters}
        sort={sort}
        options={options}
        onSelect={handleSelectChannel}
        Preview={(props) => {
          const isRead = props.latestMessagePreview?.status === MessageReadStatus.READ;
          const messageDate = props.latestMessagePreview?.created_at ? dayjs(props.latestMessagePreview?.created_at).toDate() : dayjs().toDate()

          return (
            <Swipeable 
              rightThreshold={10}
              overshootLeft
              overshootRight
              renderRightActions={() => (
                <TouchableOpacity onPress={() => props.channel.delete()} style={styles.deleteButton}>
                  <MaterialCommunityIcons name='trash-can' size={icons.SIZES.NORMAL} color={colors.light.white} />
                </TouchableOpacity>
              )}>
              <TouchableOpacity onPress={() => handleSelectChannel(props.channel)} style={styles.message}>
                <ChannelAvatar channel={props.channel} />

                <View style={[styles.details, styles.row]}>
                  <View style={styles.flex}>
                    <View style={styles.row}>
                      <Text type='default-semibold' style={styles.messageTitle}>{props.channel.data?.name}</Text>

                      <MaterialCommunityIcons
                        name='bell-off'
                        size={icons.SIZES.SMALL}
                        color={colors.light.grayDeep}
                      />
                    </View>
                    
                    <Text type='default' style={styles.messageBody}>
                      {props.latestMessagePreview.previews[0].text}
                    </Text>
                  </View>

                  <View>
                      <MaterialCommunityIcons
                        name={isRead ? 'check-all' : 'check'}
                        size={icons.SIZES.SMALL}
                        color={isRead ? colors.light.primary : colors.light.grayDeep}
                      />
                    
                      <View>
                          {props.formatLatestMessageDate && messageDate && (
                            <Text type='default' style={styles.messageDate}>
                              {props.formatLatestMessageDate(messageDate).toString()}
                            </Text>
                          )}
                      </View>

                      <View style={styles.unreadContainer}>
                        <Text numberOfLines={1} type='default-semibold' style={styles.unreadText}>
                          {props.unread! > 99 ? `${props.unread}+` : props.unread}  
                        </Text>
                      </View>
                  </View>
                  

                </View>
              </TouchableOpacity>
            </Swipeable>
          );
        }}
        EmptyStateIndicator={() => (
          <EmptyItem 
            style={styles.empty}
            src={require('@/src/assets/images/message.png')}
            label='No Messages Yet' 
            description='No messages in your inbox, yet!' 
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
    messageDate: {
      fontSize: 12, 
      textAlign: 'right',
      textTransform: 'uppercase',
    },
    details: { flex: 1, borderBottomWidth: 1, gap: 20, borderBottomColor: colors.light.dew, paddingBottom: 16 },
    description: {
      fontSize: 17,
      fontFamily: defaultStyles.jakartaMedium.fontFamily,
      textAlign: 'center',
      lineHeight: 24,
      color: colors.light.gray,
      marginTop: 10
    },
    deleteButton: {
      backgroundColor: colors.light.danger,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70
    },
    empty: { backgroundColor: colors.light.white },
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
    message: {
      flexDirection: 'row',
      gap: 15,
      alignItems: 'flex-start',
      padding: 16,
      paddingBottom: 0,
    },
    messageBody: { color: colors.light.graySemi, fontSize: 12, textAlign: 'left'  },
    messageTitle: { color: colors.light.dark, fontSize: 14  },
    header: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 10 },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
    },
    screen: { backgroundColor: colors.light.white, flex: 1 },
    title: {
      fontSize: 28,
      fontFamily: defaultStyles.jakartaBold.fontFamily,
      textAlign: 'center',
      lineHeight: 33,
      color: '#212121'
    },
    unreadContainer: {
      backgroundColor: colors.light.primary,
      alignItems: 'center',
      marginTop: 5,
      borderRadius: 20,
      width: 20,
      height: 20,
      justifyContent: 'center',
    },
    unreadText: {
      color: colors.light.white,
      fontSize: 10,
      lineHeight: 0,
    },
});

export default Channels;
