import {createSlice} from '@reduxjs/toolkit';
import {IArtistInfo} from '../types';

const initialState: IArtistInfo = {
  bio: {
    content: '',
    published: '',
    summary: '',
  },
  image: [],
  mbid: '',
  name: '',
  url: '',
};

export const artistDetailsSlice = createSlice({
  name: 'artistDetails',
  initialState,
  reducers: {
    setArtistDetails: (state, action) => {
      state = action.payload;
      return state;
    },
    clearArtistDetails: state => {
      state = initialState;
      return state;
    },
  },
});

export const {setArtistDetails, clearArtistDetails} =
  artistDetailsSlice.actions;

export const artistDetailsReducer = artistDetailsSlice.reducer;
