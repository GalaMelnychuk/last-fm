import {ArtistDetailsScreenProps} from '../screens/ArtistDetailsScreen';
import {AlbumTracksScreenProps} from '../screens/AlbumTracksScreen';

export enum ScreenEnum {
  WelcomeScreen = 'WelcomeScreen',
  HomeScreen = 'HomeScreen',
  AlbumTracksScreen = 'AlbumTracksScreen',
  ArtistDetailsScreen = 'ArtistDetailsScreen',
}

export type MainStackParamList = {
  [ScreenEnum.WelcomeScreen]: undefined;
  [ScreenEnum.HomeScreen]: undefined;
  [ScreenEnum.AlbumTracksScreen]: AlbumTracksScreenProps;
  [ScreenEnum.ArtistDetailsScreen]: ArtistDetailsScreenProps;
};
