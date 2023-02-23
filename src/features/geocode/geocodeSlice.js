import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGeoPosition, getWeather, getForecast } from '../../utils/api';

export const getPosition = createAsyncThunk('geocode/getPosition', async (criteria = 'null') => {
  return await getGeoPosition(criteria);
});

export const getLocatedWeather = createAsyncThunk('geocode/getLocatedWeather', async (arg = 'null', api) => {
  try {
    const selectedPosition = api.getState().geocode.selectedPosition;
    return await getWeather({latitude: selectedPosition.lat, longitude: selectedPosition.lon});
  } catch (e) {
    console.log(e);
  }
});

export const getLocatedForecast = createAsyncThunk('geocode/getLocatedForecast', async (arg = 'null', api) => {
  try {
    const selectedPosition = api.getState().geocode.selectedPosition;
    return await getForecast({latitude: selectedPosition.lat, longitude: selectedPosition.lon});
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  filteredPositions: [],
  selectedPosition:  {},
  locatedWeather: {},
  locatedForecast: {},
  geoLoading: false,
  geoStatus: '',
  geoErrors: []
};

const geocodeSlice = createSlice({
  name: 'geocode',
  initialState,
  reducers: {
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
    clearErrors: (state, action) => {
      state.errors = [];
    },
    clearFilteredPositions: (state) => {
      state.filteredPositions = []
    }
  },
  extraReducers: builder => {
    // geocode location thunk
    builder.addCase(getPosition.pending, (state, action) => {
      state.geoStatus = 'Locating position...';
      state.geoLoading = true;
    })
    .addCase(getPosition.fulfilled, (state, action) => {
      state.geoStatus = 'Position Located!';
      state.geoErrors = [];
      state.geoLoading = false;
      state.filteredPositions = action.payload;
    })
    .addCase(getPosition.rejected, (state, action) => {
      state.geoStatus = 'Error locating position!';
      state.geoErrors.push(action.error);
      state.geoLoading = false;
    });

    // Geocode weather thunk
    builder.addCase(getLocatedWeather.pending, (state) => {
      state.geoStatus = 'Loading Weather for location...';
      state.geoLoading = true;
    })
    .addCase(getLocatedWeather.fulfilled, (state, action) => {
      state.geoStatus = 'Weather for Location loaded!';
      state.geoErrors = [];
      state.geoLoading = false;
      state.locatedWeather = action.payload;
    })
    .addCase(getLocatedWeather.rejected, (state, action) => {
      state.geoStatus = 'Error loading weather for selected position!';
      state.geoErrors.push(action.error);
      state.geoLoading = false;
    });

    // Geocode forecast thunk
    builder.addCase(getLocatedForecast.pending, (state) => {
      state.geoStatus = 'Loading Forecast for location...';
      state.geoLoading = true;
    })
    .addCase(getLocatedForecast.fulfilled, (state, action) => {
      state.geoStatus = 'Forecast for Location loaded!';
      state.geoErrors = [];
      state.geoLoading = false;
      state.locatedForecast = action.payload;
    })
    .addCase(getLocatedForecast.rejected, (state, action) => {
      state.geoStatus = 'Error loading forecast for selected position!';
      state.geoErrors.push(action.error);
      state.geoLoading = false;
    });
  }
});

export const {
  setSelectedPosition,
  clearFilteredPositions,
  clearErrors
} = geocodeSlice.actions;

export const filteredPositionsSelector = state => state.geocode.filteredPositions;
export const selectedPositionSelector = state => state.geocode.selectedPosition;
export const locatedWeatherSelector = state => state.geocode.locatedWeather;
export const locatedForecastSelector = state => state.geocode.locatedForecast;
export const geoLoadingSelector = state => state.geocode.geoLoading;
export const geoErrorsSelector = state => state.geocode.geoErrors;
export const geoStatusSelector = state => state.geocode.geoStatus;

export default geocodeSlice.reducer;
