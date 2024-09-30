

import { Slot } from 'expo-router';
export { ErrorBoundary } from 'expo-router';

import AppProvider from '@/components/authentication/Provider';
import useInitializeApp from '@/hooks/useInitializeApp';

import 'react-native-reanimated';

const AppLoading = () => {
  const isInitialized = useInitializeApp();

  if (!isInitialized) {
    return null;
  }

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AppProvider>
      <AppLoading />
    </AppProvider>
  );
};

export default RootLayout;