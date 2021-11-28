import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../api/userApi"


export const fetchUser = createAsyncThunk('user/login', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        const response = await getUser()
        return response;
    }
    catch (error) {
        console.log(error)
    }
})

//Intial State
const initialState = {
    user: null,
}

const userSlices = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.user = action.payload.user
        },
    },
    extraReducers: {
        [fetchUser.fulfilled]:
            (state, action) => {
                state.user = action.payload
            }

    }

})


//generate the action creators
export const { setUser } = userSlices.actions
//export reducers
export default userSlices.reducer;