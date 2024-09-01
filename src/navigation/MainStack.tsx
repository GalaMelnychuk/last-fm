import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParamList, ScreenEnum} from './types';
import {HomeScreen} from '../screens/HomeScreen';
import {SignInFormScreen} from '../screens/WelcomeScreen';
import {ArtistDetailsScreen} from '../screens/ArtistDetailsScreen';
import {AlbumTracksScreen} from '../screens/AlbumTracksScreen';

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
            title: 'Top Albums',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name={ScreenEnum.AlbumTracksScreen}
          component={AlbumTracksScreen}
          options={{
            title: 'Album Tracks',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name={ScreenEnum.ArtistDetailsScreen}
          component={ArtistDetailsScreen}
          options={({route}) => {
            return {
              title: route.params.artist,
              headerBackTitle: 'Back',
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
