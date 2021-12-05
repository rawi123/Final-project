import React from 'react'
import { useSelector } from 'react-redux'

export default function PlayersCards({ players, currentPlayer }) {
    const { user } = useSelector(state => state.user);

    return (<>
        {players.map((val, i) => {
            if (val.number === currentPlayer.number) {
                return (
                    <div style={{
                        background: val.number === 0 ? "blue" : val.number === 1 ? "yellow" : val.number === 2 ? "red" : "greem",
                        border: val.number === 0 ? "4px solid blue" : val.number === 1 ? "4px solid yellow" : val.number === 2 ? "4px solid red" : "4px solid greem"
                    }} key={val.socketId} className={`flex center column player-card player-card${i}`}>    
                        <h4>{user ? user.username : "YOU"} </h4>
                        <h3>player: {val.number + 1} </h3>
                        <hr />
                        <div style={{width:"80%",flexWrap:"wrap",fontSize:".9rem"}} className="flex center">pokemons: {currentPlayer.pokemons.map((pokemon,i)=><span key={pokemon.name} style={{paddingRight:".3rem"}}> {pokemon.name}{i===currentPlayer.pokemons.length-1?null:", "} </span>)}</div>
                        <p style={{ marginTop: ".3rem" }}> lands:{currentPlayer.ownedLands.length ? currentPlayer.ownedLands.map((land, landIdx) => <>{land.name} {landIdx = currentPlayer.ownedLands.lenght - 1 ? null : ","}</>) : "none"}</p>
                        money:{currentPlayer.money}
                    </div>
                )
            }
            return (
                <div style={{
                    background: val.number === 0 ? "blue" : val.number === 1 ? "yellow" : val.number === 2 ? "red" : "greem",
                    border: val.number === 0 ? "4px solid blue" : val.number === 1 ? "4px solid yellow" : val.number === 2 ? "4px solid red" : "4px solid greem"
                }}
                    key={val.socketId} className={`flex center column player-card player-card${i}`} >
                    <h3>player: {val.number + 1}</h3>
                    <hr />
                    <p style={{ marginTop: ".3rem" }}> lands:{val.ownedLands.length ? val.ownedLands.map((land, landIdx) => <>{land.name} {landIdx = val.ownedLands.lenght - 1 ? null : ","}</>) : "none"}</p>
                    money:{val.money}
                </div>
            )
        })}
    </>
    )
}