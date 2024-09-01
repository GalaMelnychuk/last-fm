import React from 'react';
import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';
import {colors, defaultMainPadding, screenHeight} from '../../styles/constans';

interface Props {
  children: React.ReactNode;
  wrapperStyle?: ViewStyle;
}

export const RootContainer: React.FC<Props> = ({children, wrapperStyle}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrapper, wrapperStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: defaultMainPadding,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
