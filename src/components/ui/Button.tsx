import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {colors} from '../../styles/constans';

interface Props {
  title: string;
  onPress: () => void;
  textStyles?: TextStyle;
  containerStyles?: ViewStyle;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  textStyles,
  containerStyles,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btn, containerStyles]}
      onPress={onPress}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontWeight: '800',
    color: colors.darkGrey,
    fontSize: '18@ms',
    marginBottom: 5,
  },
  btn: {
    marginTop: '12@ms',
    marginBottom: '16@ms',
    padding: '10@ms',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: '8@ms',
    backgroundColor: colors.liveLight,
  },
});
