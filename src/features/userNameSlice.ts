import {createSlice} from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
  name: 'userName',
  initialState: '',
  reducers: {
    setUserName: (state, action) => {
      state = action.payload;
      return state;
    },

    resetName: state => {
      state = '';
      return state;
    },
  },
});

export const {setUserName, resetName} = userNameSlice.actions;

export const userNameReducer = userNameSlice.reducer;
