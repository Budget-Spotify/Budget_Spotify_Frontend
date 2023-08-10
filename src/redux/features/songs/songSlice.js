import {createSlice} from "@reduxjs/toolkit";

export const songSlice = createSlice({
    name: 'song',
    initialState: {
        song: {},
        currentPlaylist: []
    },
    reducers: {
        setSong: (state, action) => {
            state.song = {...action.payload}
        },
        setPlayList: (state, action) =>{
            state.currentPlaylist = [...action.payload]
        },
        resetPlayList: (state, action)=>{
            state.currentPlaylist = []
        },
        addSongIntoPlayList: (state, action) =>{
            state.currentPlaylist.push(action.payload)
        }
    }
})

export const {setSong, setPlayList, resetPlayList, addSongIntoPlayList} = songSlice.actions;
export default songSlice.reducer;