import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';
import pokemonsReducer from "../slices/pokemonSlices";
import playersReducer from "../slices/playersSlices";
import currentPlayerReducer from "../slices/currentPlayerSlices";

const store = configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        players: playersReducer,
        currentPlayer:currentPlayerReducer,
        // ingameUser:ingameUserReducer
    },
})

export default store