import {AlbumDetailsScreenProps} from '../screens/AlbumDetailsScreen';
import {AlbumTracksScreenProps} from '../screens/AlbumTracksScreen';

export enum ScreenEnum {
  WelcomeScreen = 'WelcomeScreen',
  HomeScreen = 'HomeScreen',
  AlbumTracksScreen = 'AlbumTracksScreen',
  AlbumDetailsScreen = 'AlbumDetailsScreen',
}

export type MainStackParamList = {
  [ScreenEnum.WelcomeScreen]: undefined;
  [ScreenEnum.HomeScreen]: undefined;
  [ScreenEnum.AlbumTracksScreen]: AlbumTracksScreenProps;
  [ScreenEnum.AlbumDetailsScreen]: AlbumDetailsScreenProps;
};
