import { useColorScheme } from 'react-native';
import { colors } from '@/constants';

const useThemeColor = () => {
  const theme = useColorScheme() ?? 'light';
  return colors[theme];
};

export default useThemeColor;