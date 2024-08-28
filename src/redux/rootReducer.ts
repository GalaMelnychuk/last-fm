import {combineReducers} from '@reduxjs/toolkit';
import {topAlbumsReducer} from '../features/topAlbumsSlice';

export const rootReducer = combineReducers({
  topAlbums: topAlbumsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
