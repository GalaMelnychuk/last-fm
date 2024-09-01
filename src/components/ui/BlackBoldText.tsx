import React from 'react';
import {Text, TextStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {colors} from '../../styles/constans';

export const BlackBoldText: React.FC<{text: string; style?: TextStyle}> = ({
  text,
  style,
}) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = ScaledSheet.create({
  text: {
    fontSize: '16@ms',
    lineHeight: '22@ms',
    fontWeight: 'bold',
    color: colors.black,
  },
});
