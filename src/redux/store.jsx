import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  planetData: [],
  currentPlanet: 0,
  routeLocation: 0,
};

const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    setPlanetData: (state, action) => {
      state.planetData = action.payload;
    },
    setCurrentPlanet: (state, action) => {
      state.currentPlanet = action.payload;
    },
    setRouteLocation: (state, action) => {
      state.routeLocation = action.payload;
    },
  },
});

export const { setPlanetData, setCurrentPlanet, setRouteLocation } =
  planetSlice.actions;

const store = configureStore({
  reducer: planetSlice.reducer,
});

export default store;
