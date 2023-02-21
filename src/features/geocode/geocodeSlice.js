import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../config';

export const getPosition = createAsyncThunk('geocode/getPosition', async () => {
  
});

const initialState = {
  filteredPositions: [],
  selectedPosition: {},
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
    }
  },
  extraReducers: builder => {

  }
});

export const {
  setSelectedPosition
} = geocodeSlice.actions;

export const filteredPositionsSelector = state => state.geocode.filteredPositions;
export const selectedPositionSelector = state => state.geocode.selectedPosition;
export const geoLoadingSelector = state => state.geocode.geoLoading;
export const geoErrorsSelector = state => state.geocode.geoErrors;
export const geoStatusSelector = state => state.geocode.geoStatus;

export default geocodeSlice.reducer;
