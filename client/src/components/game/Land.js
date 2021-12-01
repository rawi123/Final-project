import React, { useState } from 'react'

export default function Land({ classGive, cardNumber, children }) {
    const [arr] = useState([0, 10, 20, 30]);
    
    return (
        <div className={`${classGive} land flex flex-start ${arr.includes(cardNumber) ? "center" : null}`} >
            <div className={` poke-card `}>
                {children}
            </div>
        </div>
    )
}
