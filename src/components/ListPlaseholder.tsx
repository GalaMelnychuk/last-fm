import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {screenHeight, colors} from '../styles/constans';

export const ListPlaseholder = () => {
  return <Text style={styles.text}>{`No albums provided 🤷‍♂️`}</Text>;
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight / 2,
    backgroundColor: colors.white,
    paddingTop: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});
