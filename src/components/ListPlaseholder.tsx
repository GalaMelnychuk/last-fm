import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {screenHeight, colors} from '../styles/constans';

export const ListPlaseholder = () => {
  return (
    //<View style={styles.container}>
    <Text style={styles.text}>
      {/*{`You don't have any top albums yet.\nPlease, log in as a Guest and you will see albums we've selected for you 📻`}*/}
      {`No albums provided 🤷‍♂️`}
    </Text>
    //</View>
  );
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
