import React, { useEffect } from 'react'
import Board from './Board'
import "./style.css"
import { useNavigate } from 'react-router';
import socket from '../../api/socket';

export default function BoardContainer() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("room")) {
            socket.emit("join-room", sessionStorage.getItem("room"), (data) => {
                if (!data) navigate("/")
            })
        }
        else {
            navigate("/")
        }

    })
    return (
        <div className="board-global-container flex center">
            <div className="board-container">
                <Board />
            </div>
        </div>
    )
}
