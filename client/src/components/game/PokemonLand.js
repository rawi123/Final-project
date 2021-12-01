import React from 'react';
//  <img style={{ width: "80%", height: "50%" }} src={require(`../../sprites-animations/${card.name}-front.gif`).default}></img> 

export default function PokemonLand({ card }) {

    return (
        <>
            <div className="poke-card">
                <p style={{ background: card.color,width:"100%",color:card.color==="blue"?"white":"black" }}>{card.name}</p>
                <p>{card.cost}$</p>
            </div>
        </>
    )
}
