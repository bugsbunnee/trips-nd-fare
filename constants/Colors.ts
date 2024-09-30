/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const APP_COLORS = {
  MODAL_OPAQUE: '#00000040',
  BLACK: '#000',
  BORDER: '#0286FF',
  DANGER: 'rgba(188, 15, 18, 0.8)',
  DANGER_LIGHT: '#FFEDE9',
  DARK: '#333333',
  GRAY: '#858585',
  GRAY_LIGHT: '#EBEBEB',
  GRAY_MID: '#E2E8F0',
  INPUT: '#F6F8FA',
  PLACEHOLDER: '#ADADAD',
  PRIMARY: '#EF5A39',
  PRIMARY_LIGHT: '#FFEDE9',
  SHADOW: 'rgba(100, 100, 111, 0.8)',
  SUCCESS: '#0CC25F',
  WHITE: '#FFF',
};

const colors = {
  light: {
    background: APP_COLORS.WHITE,
    black: APP_COLORS.BLACK,
    danger: APP_COLORS.DANGER,
    dangerLight: APP_COLORS.DANGER_LIGHT,
    dark: APP_COLORS.DARK,
    gray: APP_COLORS.GRAY,
    grayLight: APP_COLORS.GRAY_LIGHT,
    grayMid: APP_COLORS.GRAY_MID,
    input: APP_COLORS.INPUT,
    placeholder: APP_COLORS.PLACEHOLDER,
    primary: APP_COLORS.PRIMARY,
    primaryLight: APP_COLORS.PRIMARY_LIGHT,
    shadow: APP_COLORS.SHADOW,
    success: APP_COLORS.SUCCESS,
    text: APP_COLORS.WHITE,
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    white: APP_COLORS.WHITE,
  },
  dark: {
    background: APP_COLORS.WHITE,
    black: APP_COLORS.BLACK,
    danger: APP_COLORS.DANGER,
    dangerLight: APP_COLORS.DANGER_LIGHT,
    dark: APP_COLORS.DARK,
    gray: APP_COLORS.GRAY,
    grayLight: APP_COLORS.GRAY_LIGHT,
    grayMid: APP_COLORS.GRAY_MID,
    input: APP_COLORS.INPUT,
    placeholder: APP_COLORS.PLACEHOLDER,
    primary: APP_COLORS.PRIMARY,
    shadow: APP_COLORS.SHADOW,
    success: APP_COLORS.SUCCESS,
    text: APP_COLORS.WHITE,
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    white: APP_COLORS.WHITE,
  },
};

export default colors;