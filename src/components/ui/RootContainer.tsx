import React from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
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

const styles = ScaledSheet.create({
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
