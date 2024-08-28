import {combineReducers} from '@reduxjs/toolkit';
import {topAlbumsReducer} from '../features/topAlbumsSlice';
import {userNameReducer} from '../features/userNameSlice';

export const rootReducer = combineReducers({
  topAlbums: topAlbumsReducer,
  userName: userNameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
