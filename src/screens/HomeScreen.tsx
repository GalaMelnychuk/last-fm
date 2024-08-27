import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, SafeAreaView, Pressable} from 'react-native';
import {MainStackParamList, ScreenEnum} from '../navigation/types';

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  return (
    <SafeAreaView>
      <Pressable
        onPress={() =>
          navigation.navigate(ScreenEnum.AlbumScreen, {name: 'Test'})
        }>
        <Text>HomeScreen</Text>
      </Pressable>
    </SafeAreaView>
  );
};
