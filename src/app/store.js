// Configure store
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import geocodeReducer from '../features/geocode/geocodeSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    geocode: geocodeReducer
  }
});

export default store;