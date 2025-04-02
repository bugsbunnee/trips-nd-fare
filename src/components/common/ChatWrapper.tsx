import React, { PropsWithChildren, useEffect } from "react";
import ActivityIndicator from "../ui/ActivityIndicator";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { Chat, OverlayProvider, SqliteClient, Streami18n, useCreateChatClient } from "stream-chat-expo";
import { setClient } from "@/src/store/data/slice";

SqliteClient.logger = (level, message, extraData) => {
    console.log(level, `SqliteClient: ${message}`, extraData);
};

const streami18n = new Streami18n({
    language: 'en',
});
  
const ChatWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const client = useCreateChatClient({
        apiKey: process.env.EXPO_PUBLIC_STREAM_PUBLIC_KEY!,
        tokenOrProvider: auth.chat,
        userData: {
            id: auth.user!._id,
            name: `${auth.user!.firstName} ${auth.user!.lastName}`
        },
    });
    
    useEffect(() => {
        dispatch(setClient(client));
    }, [client]);

    if (!client) {
        return <ActivityIndicator visible />;
    }

    return ( 
        <OverlayProvider i18nInstance={streami18n}>
            <Chat client={client} i18nInstance={streami18n}>
                {children}
            </Chat>
        </OverlayProvider>
    );
};
 
export default ChatWrapper;