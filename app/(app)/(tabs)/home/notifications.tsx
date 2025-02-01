import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactNativeModal from "react-native-modal";
import Screen from "@/src/components/navigation/Screen";

import _ from "lodash";

import { router } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, icons, styles as defaultStyles } from "@/src/constants";
import { Button, Text } from "@/src/components/ui";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { Notification } from "@/src/utils/models";
import { getNotifications, updateNotification } from "@/src/store/data/actions";

import Conditional from "@/src/components/common/Conditional";
import EmptyItem from "@/src/components/lists/EmptyItem";
import NotificationItem from "@/src/components/lists/NotificationItem";
import NotificationItemSkeleton from "@/src/components/lists/NotificationItemSkeleton";

const NotificationsPage: React.FC = () => {
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const data = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();

    const handleRefresh = useCallback(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const handleSelectNotification = useCallback(async (item: Notification) => {
        setSelectedNotification(item);

        if (!item.isRead) {
            dispatch(updateNotification(item._id));
        }
    }, []);
   
    const handleDismissNotification = useCallback(() => {
        setSelectedNotification(null);
    }, []);

    useEffect(() => {
        handleRefresh();
    }, [handleRefresh]);

    return ( 
        <>
            <Screen style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                        <MaterialCommunityIcons 
                            name='arrow-left'
                            size={icons.SIZES.NORMAL}
                            color={colors.light.primary}
                        />
                    </TouchableOpacity>

                    <View style={styles.flex}>
                        <Text type="default-semibold" style={styles.title}>Notification</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <Conditional visible={!data.isLoading}>
                        <FlatList
                            refreshing={data.isLoading}
                            onRefresh={handleRefresh}
                            data={data.notifications.list}
                            contentContainerStyle={styles.content}
                            keyExtractor={(item) => item._id}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                            renderItem={({ item }) => <NotificationItem notification={item} onPress={() => handleSelectNotification(item)} />}
                            ListEmptyComponent={() => (
                                <EmptyItem 
                                    label='No notifications yet'
                                    description='Your notifications will appear here once you have some'
                                    onRefresh={handleRefresh}
                                />
                            )}
                        />
                    </Conditional>

                    <Conditional visible={data.isLoading}>
                        {_.range(1, 11).map((fill, index) => (
                            <React.Fragment key={fill}>
                                <NotificationItemSkeleton />
                            </React.Fragment>
                        ))}
                    </Conditional>
                </View>

                <ReactNativeModal isVisible={!!selectedNotification}>
                    <View style={styles.modal}>
                        {selectedNotification && <NotificationItem notification={selectedNotification} />}

                        <View style={styles.dismiss}>
                            <Button label="Dismiss" onPress={handleDismissNotification} />
                        </View>
                    </View>
                </ReactNativeModal>
            </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    back: {
        width: 40,
        height: 40, 
        borderRadius: 40,
        backgroundColor: colors.light.dew,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        marginTop: 27,
    },
    content: { paddingBottom: 50 },
    dismiss: { marginTop: 10, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.light.dew },
    flex: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center' },
    modal: { backgroundColor: colors.light.white, padding: 16, borderRadius: 30 },
    screen: { backgroundColor: colors.light.white, paddingHorizontal: 16 },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: colors.light.dewDark,
        marginVertical: 0
    },
    title: {
        textAlign: 'center',
        color: colors.light.dark,
        fontSize: 20,
        lineHeight: 28,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
    },
});
 
export default NotificationsPage;