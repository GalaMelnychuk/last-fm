import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import messages from '../messages.json';
import {screenHeight, colors} from '../styles/constans';

export const Loader = ({isLoading}: {isLoading: boolean}) => {
  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <Text style={styles.text}>{messages.loading}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    backgroundColor: colors.white,
    paddingTop: 120,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
  },
});
