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
    setAlbums: (state, action) => {
      state = {
        ...state,
        items: action.payload,
      };
      return state;
    },
    setTotal: (state, action) => {
      state = {
        ...state,
        total: action.payload,
      };
      return state;
    },
    clearAlbums: state => {
      state = initialState;
      return state;
    },
  },
});

export const {setAlbums, setTotal, clearAlbums} = topAlbumsSlice.actions;

export const topAlbumsReducer = topAlbumsSlice.reducer;
