import {createSlice} from '@reduxjs/toolkit';
import {IAlbumInfo} from '../types';

const initialState: IAlbumInfo = {
  artist: '',
  image: [],
  listeners: '',
  mbid: '',
  name: '',
  playcount: '',
  tags: {tag: []},
  url: '',
  wiki: {
    content: '',
    published: '',
    summary: '',
  },
};

export const albumInfoSlice = createSlice({
  name: 'albumInfo',
  initialState,
  reducers: {
    setAlbumInfo: (state, action) => {
      state = action.payload;
      return state;
    },
    clearAlbumInfo: state => {
      state = initialState;
      return state;
    },
  },
});

export const {setAlbumInfo, clearAlbumInfo} = albumInfoSlice.actions;

export const albumInfoReducer = albumInfoSlice.reducer;
