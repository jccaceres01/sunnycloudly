// Weather slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather, getForecast } from '../../utils/api';

// Get weather async thunk
export const getWeatherData = createAsyncThunk('weather/getWeatherData', async (arg = null, api) => {
  const { coords } = api.getState().weather;

  if (coords.latitude && coords.longitude) {
    return await getWeather(coords);
  } else {
    return {};
  }
});

// Get forecast async thunk
export const getForecastData = createAsyncThunk('weather/getForecastData', async (arg = null, api) => {
  const { coords } = api.getState().weather;

  if (coords.latitude && coords.longitude) {
    return await getForecast(coords);
  } else {
    return {};
  }
});

const initialState = {
  coords: {longitude: 0, latitude: 0},
  weather: {},
  forecast: {},
  unit: 'c',
  loading: false,
  status: '',
  errors: []
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    clearErrors: (state) => {
      state.errors = [];
    },
    clearStatus: (state) => {
      state.status = '';
    },
    toggleUnit: (state) => {
      state.unit = (state.unit === 'c') ? 'f' : 'c';
    }
  },
  extraReducers: (builder) => {
    // get Weather extra reducers
    builder.addCase(getWeatherData.pending, (state) => {
      state.status = 'Loading weather data...';
      state.loading = true;
    })
    .addCase(getWeatherData.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.status = 'Weather data loaded!';
      state.loading = false;
    })
    .addCase(getWeatherData.rejected, (state, action) => {
      state.status = 'Error loading weather data!';
      state.loading = false;
      state.errors.push(action.error);
    });

    // Forecast data extra reducers
    builder.addCase(getForecastData.pending, (state) => {
      state.status = 'Loading forecast data...';
      state.loading = true;
    })
    .addCase(getForecastData.fulfilled, (state, action) => {
      state.forecast = action.payload;
      state.status = 'Forecast data loaded!';
      state.loading = false;
    })
    .addCase(getForecastData.rejected, (state, action) => {
      state.status = 'Error loading forecast data!';
      state.loading = false;
      state.errors.push(action.error);
    });
  }
});

export const {
  setLoading,
  setCoords,
  clearErrors,
  clearStatus,
  toggleUnit
} = weatherSlice.actions;

// Export selectors
export const loadingSelector = state => state.weather.loading;
export const weatherSelector = state => state.weather.weather;
export const forecastSelector = state => state.weather.forecast;
export const coordsSelector = state => state.weather.coords;
export const statusSelector = state => state.weather.status;
export const unitSelector = state => state.weather.unit;

export default weatherSlice.reducer;
