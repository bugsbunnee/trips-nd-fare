

import React from 'react';
import { Slot } from 'expo-router';
export { ErrorBoundary } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import * as WebBrowser from 'expo-web-browser';


import AppProvider from '@/components/authentication/Provider';
import useInitializeApp from '@/hooks/useInitializeApp';

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
      <Slot />
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