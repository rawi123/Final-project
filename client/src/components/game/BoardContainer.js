import React from 'react'
import Board from './Board'
import "./style.css"

export default function BoardContainer() {

    return (
        <div className="board-global-container flex center">
            <div className="board-container">
                <Board/>
            </div>
        </div>
    )
}
