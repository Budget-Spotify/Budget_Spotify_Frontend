import {configureStore} from "@reduxjs/toolkit";
import songReducer from '../features/songs/songSlice'

export const store = configureStore({
    reducer: {
        song: songReducer
    }
})