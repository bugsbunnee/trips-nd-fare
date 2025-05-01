

import React from 'react';
import { Slot } from 'expo-router';
export { ErrorBoundary } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import * as WebBrowser from 'expo-web-browser';

import AppProvider from '@/src/components/authentication/Provider';
import OfflineNotice from '@/src/components/common/OfflineNotice';
import Updates from '@/src/components/common/Updates';
import useInitializeApp from '@/src/hooks/useInitializeApp';

import 'expo-dev-client';
import 'react-native-reanimated';
import 'react-native-get-random-values';

configureReanimatedLogger({ level: ReanimatedLogLevel.warn, strict: false });
WebBrowser.maybeCompleteAuthSession();

const AppLoading: React.FC = () => {
  const isInitialized = useInitializeApp();

  if (!isInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView>
        <OfflineNotice />
        <Slot />
        <Updates />
    </GestureHandlerRootView>
  );
};

const RootLayout = () => {
  return (
    <AppProvider>
      <AppLoading />
    </AppProvider>
  );
};

export default RootLayout;