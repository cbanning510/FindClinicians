import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  location: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;
