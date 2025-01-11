import { useColorScheme } from 'react-native';
import { colors } from '@/src/constants';

const useThemeColor = () => {
  const theme = useColorScheme() ?? 'light';
  return colors[theme];
};

export default useThemeColor;