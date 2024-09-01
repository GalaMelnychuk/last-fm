import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../../styles/constans';

interface Props {
  name: string;
  onPress: () => void;
}

export const ArlistItem: React.FC<Props> = ({name, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>🎤 {name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: colors.whiteSmoke,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
