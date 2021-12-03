import React, { Component } from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@mui/material/Button';

export default class Dice extends Component {

    
render() {
    return (< >
        <ReactDice
            numDice={2}
            rollDone={(rollSum) => this.props.rolledDice(rollSum)}
            faceColor={"#EAC292"}
            dotColor={"white"}
            disableIndividual={true}
            ref={dice => this.reactDice = dice}
            rollTime={1}
            defaultRoll={1}
        />
        <Button sx={{ color: "black", fontWeight: 700, border: "2px solid black" }} onClick={() => this.reactDice.rollAll()}>Roll</Button>
    </>
    )
}
}
