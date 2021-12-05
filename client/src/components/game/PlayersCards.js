import React from 'react'

export default function PlayersCards({ players }) {
    return (<>
        {players.map((val, i) => {
            return (
                <div style={{
                    background: val.number === 0 ? "blue" : val.number === 1 ? "yellow" : val.number === 2 ? "red" : "greem",
                    border: val.number === 0 ? "4px solid blue" : val.number === 1 ? "4px solid yellow" : val.number === 2 ? "4px solid red" : "4px solid greem"
                }}
                    key={val.socketId} className={`flex center column player-card player-card${i}`} >
                    <h3>player: {val.number+1}</h3>
                    <hr/>
                    <p style={{marginTop:".3rem"}}> lands:{val.ownedLands.length ? val.ownedLands.map((land, landIdx) => <>{land.name} {landIdx = val.ownedLands.lenght - 1 ? null : ","}</>) : "none"}</p>
                    money:{val.money}
                </div>
            )
        })}
    </>
    )
}