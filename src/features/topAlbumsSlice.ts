import {createSlice} from '@reduxjs/toolkit';
import {IAlbum} from '../types';

interface InitialState {
  items: IAlbum[] | [];
  total: string;
}
const initialState: InitialState = {
  items: [],
  total: '0',
};

export const topAlbumsSlice = createSlice({
  name: 'topAlbums',
  initialState,
  reducers: {
    setTopAlbums: (state, action) => {
      state = {
        ...state,
        items: action.payload,
      };
      return state;
    },
    setTotalTopAlbums: (state, action) => {
      state = {
        ...state,
        total: action.payload,
      };
      return state;
    },
    clearTopAlbums: state => {
      state = initialState;
      return state;
    },
  },
});

export const {setTopAlbums, setTotalTopAlbums, clearTopAlbums} =
  topAlbumsSlice.actions;

export const topAlbumsReducer = topAlbumsSlice.reducer;
