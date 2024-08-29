import {combineReducers} from '@reduxjs/toolkit';
import {topAlbumsReducer} from '../features/topAlbumsSlice';
import {userNameReducer} from '../features/userNameSlice';
import {albumInfoReducer} from '../features/albumInfoSlice';
import {artistDetailsReducer} from '../features/artistDetailsSlice';

export const rootReducer = combineReducers({
  userName: userNameReducer,
  topAlbums: topAlbumsReducer,
  albumInfo: albumInfoReducer,
  artistDetails: artistDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
