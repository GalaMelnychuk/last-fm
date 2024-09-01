import React from 'react';
import {StyleSheet, Text} from 'react-native';
import messages from '../messages.json';
import {colors} from '../styles/constans';

export const ListPlaseholder = () => {
  return <Text style={styles.text}>{messages.no_albums}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});
