import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlices';
import pokemonsReducer from "../slices/pokemonSlices";
import playersReducer from "../slices/playersSlices";
import turnReducer from "../slices/turnSlices";
import playReducer from "../slices/playSlices";
import currentPlayerReducer from "../slices/currentPlayerSlices";

const store = configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        players: playersReducer,
        currentPlayer:currentPlayerReducer,
        turn:turnReducer,
        play:playReducer
        // ingameUser:ingameUserReducer
    },
})

export default store