import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';

const store = configureStore({
    reducer: {
        user:userReducer,
        // ingameUser:ingameUserReducer
    },
})

export default store