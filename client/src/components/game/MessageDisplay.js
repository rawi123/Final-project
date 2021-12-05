import React, { useState } from 'react'
// import image from "../../sprites-animations"
export default function MessageDisplay({ card }) {
    // console.log(card.card);
    // if (typeof card.card === "object") {
    //     return (
    //         <div className={`${card ? "message-card background-no-fill" : "message-card-hide"}`}>
    //             <img src={require(`../../sprites-animations/${card.card.name}-front.gif`).default} ></img>
    //         </div>
    //     )
    // }
    if (card.card === "prize") {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>Your lucky! the goverment felt nice</h2>
                <h2>You won {card.sum}$</h2>
            </div>
        )
    }
    if (card.card === "tax") {
        <div className={`${card ? "message-card" : "message-card-hide"}`}>
            <h2>Tax cover: you have to pay {card.sum}$</h2>
        </div>
    }
    if (card.card === "go") {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>You got Paid 2000$</h2>
            </div>
        )
    }
    if (card.card === "card") {
        if (card.rnd === 10) {
            return (
                <div className={`${card ? "message-card" : "message-card-hide"}`}>
                    <h2>You Won a mysterious Pokemon!</h2>
                </div>
            )
        }
        if (card.rnd <= 5) {
            return (
                <div className={`${card ? "message-card" : "message-card-hide"}`}>
                    <h2>You got robbed for {card.sum}$</h2>
                </div>
            )
        }
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2>A mysterious man paid you {card.sum}$ </h2>
            </div>
        )
    }
    if (card.card === "jail") {
        return (
            <div className={`${card ? "message-card" : "message-card-hide"}`}>
                <h2> Jailed! you are susspended for 1 round! </h2>
            </div>
        )
    }
    return (
        <>

        </>
    )
}
