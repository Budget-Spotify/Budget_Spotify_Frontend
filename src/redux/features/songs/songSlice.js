import {createSlice} from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: 'song',
    initialState: {
        song: {}
    },
    reducers: {
        setSong: (state, action) => {
            state.song = {...action.payload}
        }
    }
})

export const {setSong} = songSlice.actions;
export default songSlice.reducer;