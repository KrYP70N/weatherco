import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../hook/location-hook';
import { LocationAPIError, LocationData } from '../hook/apis/forecast-hook'

interface GeneralState {
  location?: Location;
  name: string;
  data?: LocationData
}

const initialState: GeneralState = {
  name: ""
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    updateData: (state, action: PayloadAction<LocationData>) => {
      state.data = action.payload
    }
  },
});

export const { updateLocation, updateName, updateData } = generalSlice.actions;
export default generalSlice.reducer;
