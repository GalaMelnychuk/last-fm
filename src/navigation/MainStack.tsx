import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, ScreenEnum} from './types';
import {HomeScreen} from '../screens/HomeScreen';
import {SignInFormScreen} from '../screens/WelcomeScreen';
import {AlbumDetailsScreen} from '../screens/AlbumDetailsScreen';
import {AlbumScreen} from '../screens/AlbumScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenEnum.WelcomeScreen}
          options={{title: 'Welcome'}}
          component={SignInFormScreen}
        />
        <Stack.Screen
          name={ScreenEnum.HomeScreen}
          component={HomeScreen}
          options={{
            title: 'List Albums',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name={ScreenEnum.AlbumScreen}
          component={AlbumScreen}
          options={{
            title: 'Album',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name={ScreenEnum.AlbumDetailsScreen}
          component={AlbumDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
