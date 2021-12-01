import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';
import pokemonsReducer from "../slices/pokemonSlices";
import playersReducer from "../slices/playersSlices";

const store = configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        players: playersReducer,
        // ingameUser:ingameUserReducer
    },
})

export default store