import React from 'react'
// import image from "../../sprites-animations"
export default function MessageDisplay({ card, turn, currentPlayer }) {

    if (card.card === "win" || card.card === "lost") {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>
                    {card.card === "win" ? "You won!" : card.player ? `player ${turn + 1} lost!` : "You lost!"}
                </h2>
            </div>)
    }
    if (typeof card.card === "object" && card.haveToSell) {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>
                    {turn === currentPlayer.number ? "you have to sell in order to " : `player ${turn + 1} have to sell in order to`} pay {card.payToPlayer === currentPlayer.number ? "you " : card.payToPlayer ? `player ${turn + 1} ` : null} {card.moneyTakeOut}$
                </h2>
            </div>
        )
    }

    if (typeof card.card === "object" && card.payToPlayer !== null) {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>
                    {turn === currentPlayer.number ? "you paid rent to " : `player ${turn + 1} paid rent to`} {card.payToPlayer === currentPlayer.number ? "you " : card.payToPlayer !== null ? `player ${turn + 1} ` : null} {card.moneyTakeOut}$
                </h2>
            </div>
        )
    }
    //rnd+2
    if (card.card === "one round jail") {
        return (
            <>
                <h2 className="small-alert"> Jailed! </h2>
            </>
        )
    }
    return (
        <>
            {(card.card && card.card !== "store" && typeof (card.card) !== "object") ? <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>
                    {card.card === "prize" ? `${turn === currentPlayer.number ? "you" : `player ${turn + 1} is`} inherited. ${card.moneyTakeOut}$ from one of your ancestors ` :
                        card.card === "tax" ? `Tax cover: ${turn === currentPlayer.number ? "you" : `player ${turn + 1}`} have to ${card.haveToSell ? "sell in order to pay " : "pay "} ${card.moneyTakeOut}$` :
                            card.card === "go" ? `${turn === currentPlayer.number ? "you" : `player ${turn + 1}`} got Paid 2000$` :
                                card.card === "card" ? card.rnd === 12 ? `${turn === currentPlayer.number ? "you" : `player ${turn + 1}`} Won a mysterious Pokemon!` : card.rnd <= 7 ? `${turn === currentPlayer.number ? "you" : `player ${turn + 1}`} got robbed for ${card.moneyTakeOut}$` : `From sales of stocks  ${turn === currentPlayer.number ? "you" : `player ${turn + 1}`} won ${card.moneyTakeOut}$` :
                                    card.card === "jail" ? `jailed for one round!` : null}
                </h2>
            </div> : null}
        </>
    )
}
