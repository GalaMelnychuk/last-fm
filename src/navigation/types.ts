export enum ScreenEnum {
  SignInFormScreen = 'SignInFormScreen',
  HomeScreen = 'HomeScreen',
  AlbumScreen = 'AlbumScreen',
  AlbumDetailsScreen = 'AlbumDetailsScreen',
}

export type MainStackParamList = {
  [ScreenEnum.SignInFormScreen]: undefined;
  [ScreenEnum.HomeScreen]: undefined;
  [ScreenEnum.AlbumScreen]: {
    name: string;
  };
  [ScreenEnum.AlbumDetailsScreen]: undefined;
};
