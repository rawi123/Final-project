import React from 'react'

export default function PlayersCards({ players }) {
    return (<>
        {players.map((val, i) => {
            return (
            <div key={val.socketId} className={`flex center column player-card player-card${i}`}>
                <h5>player: {val.number}</h5>
               <p> lands:{val.ownedLands.length?val.ownedLands.map((land, landIdx) => <>{land.name} {landIdx = val.ownedLands.lenght - 1 ? null : ","}</>):"none"}</p>
                money:{val.money}
            </div>
            )
        })}
    </>
    )
}
