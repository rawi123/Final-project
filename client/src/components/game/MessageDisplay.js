import React from 'react'
// import image from "../../sprites-animations"
export default function MessageDisplay({ card,turn,currentPlayer }) {


    return (
        <>
            {(card.card &&card.card!=="store" && typeof (card.card) !== "object") ? <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>
                    {card.card === "prize" ? `${turn=== currentPlayer.number ? "you" : `player ${turn+1} is`} lucky! the goverment felt nice. ${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} won ${card.sum}$` :
                        card.card === "tax" ? `Tax cover: ${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} have to pay ${card.sum}$` :
                            card.card === "go" ? `${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} got Paid 2000$` :
                                card.card === "card" ? card.rnd === 10 ? `${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} Won a mysterious Pokemon!` : card.rnd <= 5 ? `${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} got robbed for ${card.sum}$` : `A mysterious man paid ${turn=== currentPlayer.number ? "you" : `player ${turn+1}`} ${card.sum}$` :
                                    card.card === "jail" ? `jailed for one round!` : null}
                </h2>
            </div> : null}
        </>
    )
}
