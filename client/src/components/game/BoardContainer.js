import React, { useEffect } from 'react'
import Board from './Board'
import "./style.css"
import { useNavigate } from 'react-router';
import socket from '../../api/socket';

export default function BoardContainer() {
    const navigate = useNavigate();
    
    useEffect(() => {
        socket.emit("socket-room", room => {
            if (room[0].slice(0, 4) !== "room") {
                navigate("/game")
            }
        })
    }, [])

    return (
        <div className="board-global-container flex center">
            <div className="board-container">
                <Board />
            </div>
        </div>
    )
}
