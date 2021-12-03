import React, { useState, useEffect } from 'react'
import Board from './Board'
import "./style.css"
import { useNavigate } from 'react-router';
import socket from '../../api/socket';
import Dice from "./Dice"
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer } from "../../redux/slices/currentPlayerSlices"
import { setPlayers } from "../../redux/slices/playersSlices";
import { setPlay } from '../../redux/slices/playSlices';
import Button from '@mui/material/Button';
import PlayersCards from './PlayersCards';

export default function BoardContainer() {
    const navigate = useNavigate();
    const [displayDice, setDisplayDice] = useState(false);
    const { turn } = useSelector(state => state.turn);
    const { currentPlayer } = useSelector(state => state.currentPlayer);
    const { players } = useSelector(state => state.players);
    const {play}=useSelector(state=>state.play);

    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit("socket-room", room => {
            if (room[0].slice(0, 4) !== "room") {
                navigate("/game")
            }
        })
        if (turn === currentPlayer?.number) {
            setDisplayDice(true);
        }
    }, [])

    const rolledDice = async (sum) => {
        const oldPos = currentPlayer.pos,
            newPos = (oldPos + sum) % 40;
        await walk(oldPos, sum);
        const currentPlayerTemp={...currentPlayer,pos:newPos,money:(oldPos+sum)>=40?currentPlayer.money+2000:currentPlayer.money};
        dispatch(setCurrentPlayer({ currentPlayer:currentPlayerTemp }));
        dispatch(setPlay({ play: true }));
    }

    const wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const walk = async (oldPos, sum) => {

        for (let i = 1; i <= sum; i++) {
            await wait(0);
            const newPlayers = [...players];
            newPlayers[turn] = { ...newPlayers[turn], pos: (oldPos + i) % 40,money:(oldPos+i)>=40?newPlayers[turn].money+2000:newPlayers[turn].money };
            dispatch(setPlayers({ players: newPlayers }));
        }

    }


    return (
        <div className="board-global-container flex center">
            <div className="board-container">
                <Board />
            </div>
            <div>
                <div className="flex column">
                    {displayDice ? <Dice rolledDice={rolledDice}></Dice> : null}
                </div>
                {play?<Button> play </Button>:null}
            </div>
            <PlayersCards players={players}></PlayersCards>
        </div>
    )
}
