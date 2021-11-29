import React from 'react'
import PokeCard from './PokeCard'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

export default function BackPack({ classToPut, setStore }) {
    const { user } = useSelector(state => state?.user);

    const closeStore = () => {
        setStore("none")
    }
    return (
        <div className={`flex column ${classToPut}`}>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={closeStore} />
            <div className="flex center"><h2>My Pokemons</h2></div>
            <div className="store-items">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {user ? user.pokemons.map(pokemon => <PokeCard key={pokemon._id+1} removeBuy={true} pokemon={pokemon} />) : null}
                </Grid>
            </div>
        </div>
    )
}