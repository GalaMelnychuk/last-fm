import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, SafeAreaView, Pressable} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';

export const SignInFormScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.navigate(ScreenEnum.HomeScreen)}>
        <Text>Navigation to Home screen</Text>
      </Pressable>
    </SafeAreaView>
  );
};
