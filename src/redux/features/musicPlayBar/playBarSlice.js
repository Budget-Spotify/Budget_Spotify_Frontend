import {createSlice} from "@reduxjs/toolkit";

export const playBarSlice = createSlice({
    name: 'playBar',
    initialState: {
        isPlaying: false,
    },
    reducers: {
        setPlayBar: (state, action) => {
            state.isPlaying = action.payload;
        }
    }
});

export const {setPlayBar} = playBarSlice.actions;
export default playBarSlice.reducer;

