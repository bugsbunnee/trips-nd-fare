import React from 'react';
import { Text, type TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { PropsWithChildren, useMemo } from 'react';

import useThemeColor from '@/src/hooks/useThemeColor';
import defaultStyles from '@/src/constants/styles';

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
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: defaultStyles.jakartaMedium.fontFamily,
        fontWeight: defaultStyles.jakartaMedium.fontWeight,
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: defaultStyles.jakartaRegular.fontFamily,
        fontWeight: defaultStyles.jakartaRegular.fontWeight,
    },
    defaultSemibold: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: defaultStyles.jakartaSemibold.fontFamily,
        fontWeight: defaultStyles.jakartaSemibold.fontWeight,
    },
});

export default AppText;