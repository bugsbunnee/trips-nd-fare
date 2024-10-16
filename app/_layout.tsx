

import { Slot } from 'expo-router';
export { ErrorBoundary } from 'expo-router';

import AppProvider from '@/components/authentication/Provider';
import useInitializeApp from '@/hooks/useInitializeApp';

import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AppLoading = () => {
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