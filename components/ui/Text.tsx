import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { PropsWithChildren, useMemo } from 'react';

import useThemeColor from '@/hooks/useThemeColor';
import defaultStyles from '@/constants/styles';

interface Props extends PropsWithChildren, TextProps {
	style?: StyleProp<TextStyle>;
    type: 'default' | 'default-semibold' | 'title' | 'subtitle' | 'link';
}

const AppText: React.FC<Props> = ({ children, type, style, ...otherProps }) => {
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const fontStyle = useMemo(() => {
    switch(type) {
        case 'default':
            return defaultStyles.body
        case 'default-semibold':
            return styles.defaultSemibold
        case 'title':
            return defaultStyles.title;
        case 'link':
            return styles.link;
        case 'subtitle':
            return styles.subtitle;
        default:
            return defaultStyles.body;
    }  
  }, [type]);

  return (
    <Text style={[styles.default, fontStyle, style]} {...otherProps}>
        {children}
    </Text>
  );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 20,
        lineHeight: 20,
        fontFamily: defaultStyles.semibold.fontFamily,
        fontWeight: defaultStyles.semibold.fontWeight,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: defaultStyles.medium.fontFamily,
        fontWeight: defaultStyles.medium.fontWeight,
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: defaultStyles.regular.fontFamily,
        fontWeight: defaultStyles.regular.fontWeight,
    },
    defaultSemibold: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: defaultStyles.semibold.fontFamily,
        fontWeight: defaultStyles.semibold.fontWeight,
    },
});

export default AppText;