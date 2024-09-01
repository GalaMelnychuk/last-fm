import {createSlice} from '@reduxjs/toolkit';
import {ISearchedArtistItem} from '../types';

interface InitialState {
  items: ISearchedArtistItem[] | [];
  total: string;
}

const initialState: InitialState = {
  items: [],
  total: '0',
};

export const artistListSlice = createSlice({
  name: 'searchedArtists',
  initialState,
  reducers: {
    setArtistList: (state, action) => {
      state = {
        ...state,
        items: action.payload,
      };
      return state;
    },
    setTotalArtistList: (state, action) => {
      state = {
        ...state,
        total: action.payload,
      };
      return state;
    },
  },
});

export const {setArtistList, setTotalArtistList} = artistListSlice.actions;

export const artistListReducer = artistListSlice.reducer;
