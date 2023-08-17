import { createSlice } from "@reduxjs/toolkit";


const latlongSlice = createSlice({
    name:'latlong',
    initialState:{
        latitude:null,
        longitude: null,
    },
    reducers:{
        setLatitude(state,action){
            state.latitude= action.payload;
        },
        setLongitude(state,action){
            state.longitude=action.payload
        }
    }
});

export const latLongActions = latlongSlice.actions

export default latlongSlice.reducer