import React from 'react';
import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {colors} from '../../styles/constans';

interface Props {
  value: string;
  placeholderText: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<Props> = ({
  value,
  onChangeText,
  containerStyle,
  placeholderText,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TextInput
        style={styles.input}
        value={value}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        autoCapitalize="words"
        placeholder={placeholderText}
        placeholderTextColor={colors.grey}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderColor: colors.purpur,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
  },
});
