import {Dimensions, Platform} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const colors = {
  white: '#ffffff',
  black: '#000000',
  grey: '#979797',
  redError: '#FF3773',
  blackBackgroundOpacity: 'rgba(31, 35, 39, 0.5)',
  lightGrey: '#c6c6c8',
  blueGrey: '#6d779e',
  blue: '#1bbbd6',
  purpur: '#7b7fff',
  darkGrey: '#3f4357',
  liveLight: '#ecf5f8',
  whiteSmoke: '#f6f6f6',
};

export const defaultMainPadding = 24;
export const isIos = Platform.OS === 'ios';
