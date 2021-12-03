import { createSlice } from "@reduxjs/toolkit";


//Intial State
const initialState = {
    play: false,
}

const playSlices = createSlice({
    name: "play",
    initialState,
    reducers: {
        setPlay: (state, action) => {
            state.play = action.payload.play;
        },
    }

})


//generate the action creators
export const { setPlay } = playSlices.actions
//export reducers
export default playSlices.reducer;