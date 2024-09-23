// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';

const store = configureStore({
    reducer: {
        countries: countryReducer,
    },
});

export default store;
