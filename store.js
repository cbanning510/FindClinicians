import {configureStore} from '@reduxjs/toolkit';
import favoriteReducer from './Screens/favoriteSlice';
import locationReducer from './Screens/locationSlice';
import authReducer from './Screens/authSlice';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    location: locationReducer,
    auth: authReducer,
  },
});
