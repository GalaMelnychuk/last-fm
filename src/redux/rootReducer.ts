import {combineReducers} from '@reduxjs/toolkit';
import {topAlbumsReducer} from '../features/topAlbumsSlice';
import {userNameReducer} from '../features/userNameSlice';
import {albumInfoReducer} from '../features/albumInfoSlice';

export const rootReducer = combineReducers({
  userName: userNameReducer,
  topAlbums: topAlbumsReducer,
  albumInfo: albumInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
