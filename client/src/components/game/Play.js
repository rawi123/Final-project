import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Store from '../Store/Store';
import { useDispatch } from 'react-redux';
import { setCurrentPlayer } from '../../redux/slices/currentPlayerSlices';
import LandDetails from './LandDetails';

export default function Play({ card, currentPlayer, endTurn,turn }) {
    
    const [store, setStore] = useState("store");
    const [land, setLand] = useState("");
    const [currentState,setCurrentState]=useState(currentPlayer);
    const dispatch = useDispatch();

    const handelBuy = (pokemon, error) => {
        const currentPlayerTemp = { ...currentPlayer };

        if (currentPlayerTemp.money > pokemon.cost) {
            currentPlayerTemp.money -= pokemon.cost;
            currentPlayerTemp.pokemons = [...currentPlayerTemp.pokemons, pokemon];
            dispatch(setCurrentPlayer({ currentPlayer: currentPlayerTemp }));
            setCurrentState(currentPlayerTemp)
        }
        else {
            error();
        }
    }

    if (card.card === "store") {
        return (
            <div className="flex column">
                <Button onClick={() => setStore("store")}>Open Store</Button>
                
                <Button onClick={() => endTurn(false,currentState,turn)}>End turn</Button>
                
                <Store handelBuyProp={handelBuy} userProp={currentPlayer} classToPut={store} setStore={setStore} />

            </div>
        )
    }
    if (typeof card.card === "object") {

        return (
            <div className="flex column">
                <Button onClick={() => setLand(land==="store"?"none":"store")}>Land details</Button>
                <Button onClick={() => endTurn(false,currentState,turn)}>End Turn</Button>
                <LandDetails classToPut={land} pokemon={card.card}/>
            </div>
        )
    }
    return <></>
}
