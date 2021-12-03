import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import playerBlack from "../../images/player-black.png";
import playerBlue from "../../images/player-blue.png";
import playerYellow from "../../images/player-yellow.png";
export default function Land({ classGive, cardNumber, children }) {
    const [arr] = useState([0, 10, 20, 30]);
    const { players } = useSelector(state => state?.players);
    return (
        <div className={`${classGive} land flex flex-start ${arr.includes(cardNumber) ? "center" : null}`} >
            <div className={` poke-card `}>

                {children}
                {players?.map(val=>{
                    if(val.pos===cardNumber){
                        return <img src={val.number===0?playerBlack:val.number===1?playerBlue:playerYellow} className={`soldier player${val.number}`}></img>
                    }
                })}
            </div>
        </div>
    )
}
