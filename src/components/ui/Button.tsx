import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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

const styles = StyleSheet.create({
  text: {
    fontWeight: '800',
    color: colors.darkGrey,
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    marginTop: 12,
    marginBottom: 26,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    backgroundColor: colors.liveLight,
  },
});
