import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';
import pokemonsReducer from "../slices/pokemonSlices";

const store = configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer
        // ingameUser:ingameUserReducer
    },
})

export default store