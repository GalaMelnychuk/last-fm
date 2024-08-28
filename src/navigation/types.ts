export enum ScreenEnum {
  WelcomeScreen = 'WelcomeScreen',
  HomeScreen = 'HomeScreen',
  AlbumScreen = 'AlbumScreen',
  AlbumDetailsScreen = 'AlbumDetailsScreen',
}

export type MainStackParamList = {
  [ScreenEnum.WelcomeScreen]: undefined;
  [ScreenEnum.HomeScreen]: undefined;
  [ScreenEnum.AlbumScreen]: {
    name: string;
  };
  [ScreenEnum.AlbumDetailsScreen]: undefined;
};
