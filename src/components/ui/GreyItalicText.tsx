import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '../../styles/constans';

export const GreyItalicText: React.FC<{text: string; style?: TextStyle}> = ({
  text,
  style,
}) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '800',
    color: colors.grey,
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
});
