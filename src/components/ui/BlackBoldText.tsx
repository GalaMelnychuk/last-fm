import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '../../styles/constans';

export const BlackBoldText: React.FC<{text: string; style?: TextStyle}> = ({
  text,
  style,
}) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
});
