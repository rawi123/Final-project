import React, { useEffect } from 'react'
import PokeCard from './PokeCard'
import "./style.css"
import { getPokemons } from "../../api/pokemonApi"
import { useDispatch, useSelector } from 'react-redux'
import { setPokemons } from '../../redux/slices/pokemonSlices'
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

export default function Store({ classToPut, setStore }) {
    const dispatch = useDispatch();
    const { pokemons } = useSelector(state => state?.pokemons);
    const { user } = useSelector(state => state?.user);

    useEffect(() => {
        if (!pokemons) {
            (async () => {
                const pokemons = await getPokemons();
                dispatch(setPokemons({ pokemons }))
            })()
        }
    }, [pokemons])

    const closeStore = () => {
        setStore("none")
    }

    return (
        <div className={`flex column ${classToPut}`}>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={closeStore} />
            <div className="flex center"><h2>Poke Store</h2></div>
            <div className="store-items">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {pokemons ?
                        pokemons.filter(val => user?.pokemons.every(ownVal => ownVal._id !== val._id))
                            .map(pokemon => <PokeCard key={pokemon._id} pokemon={pokemon} />)
                        : null}
                </Grid>
            </div>
        </div>
    )
}
