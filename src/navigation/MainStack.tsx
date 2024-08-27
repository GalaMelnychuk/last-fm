import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, ScreenEnum} from './types';
import {HomeScreen} from '../screens/HomeScreen';
import {SignInFormScreen} from '../screens/SignInFormScreen';
import {AlbumDetailsScreen} from '../screens/AlbumDetailsScreen';
import {AlbumScreen} from '../screens/AlbumScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenEnum.SignInFormScreen}
          component={SignInFormScreen}
        />
        <Stack.Screen
          name={ScreenEnum.HomeScreen}
          component={HomeScreen}
          options={{title: 'List Albums'}}
        />
        <Stack.Screen
          name={ScreenEnum.AlbumScreen}
          component={AlbumScreen}
          options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
          name={ScreenEnum.AlbumDetailsScreen}
          component={AlbumDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
