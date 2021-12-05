import React, { useState, useEffect } from 'react'
import Board from './Board';
import "./style.css";
import { useNavigate } from 'react-router';
import socket from '../../api/socket';
import Dice from "./Dice";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer } from "../../redux/slices/currentPlayerSlices";
import { setPlayers } from "../../redux/slices/playersSlices";
import { setPlay } from '../../redux/slices/playSlices';
import Button from '@mui/material/Button';
import PlayersCards from './PlayersCards';
import { Alert } from '@mui/material';
import { checkTurnAdvance, wait, updatePlayerPos, playTurn } from './boradFunctionality/boardFunctionality';
import MessageDisplay from './MessageDisplay';

export default function BoardContainer() {
    const navigate = useNavigate(),
        { turn } = useSelector(state => state.turn),
        { currentPlayer } = useSelector(state => state.currentPlayer),
        { players } = useSelector(state => state.players),
        { play } = useSelector(state => state.play),
        { socketEnabled } = useSelector(state => state.socketEnabled),
        { pokemons } = useSelector(state => state.pokemons),
        [roll, setRoll] = useState(""),
        [cards, setCards] = useState([]),
        [currentCard, setCurrentCard] = useState({ card: "", sum: "", rnd:"" }),
        dispatch = useDispatch();

    useEffect(() => {
        socket.emit("socket-room", room => {
            if (room[0].slice(0, 4) !== "room") {
                navigate("/game")
            }
        })

        if (socketEnabled) {
            socket.on("player-move", (oldPos, sum, turn) => {
                if (turn !== currentPlayer.number) {
                    setRoll(sum);
                    setTimeout(() => {
                        setRoll("")
                    }, 4000);
                }
                walk(oldPos, sum, turn);
            })
        }
    }, [])

    const rolledDice = async (sum, dicesArr) => {
        const oldPos = currentPlayer.pos,
            newPos = (oldPos + sum) % 40,
            currentPlayerTemp = { ...currentPlayer, pos: newPos, money: (oldPos + sum) >= 40 ? currentPlayer.money + 2000 : currentPlayer.money };

        socket.emit("player-move", oldPos, sum, turn);
        dispatch(setCurrentPlayer({ currentPlayer: currentPlayerTemp }));
        turnPlay(newPos);

        if (checkTurnAdvance(dicesArr)) {
            //turn advance
        }
    }

    const turnPlay = (newPos) => {
        const updatedPlayers = playTurn([...players], turn, newPos, cards, pokemons);
        setCurrentCard({ card: updatedPlayers.card, sum: updatedPlayers.moneyTakeOut, rnd: updatedPlayers.rnd });
        setTimeout(()=>setCurrentCard({card:""}),5000)
        console.log(updatedPlayers.canPlayFlag)
        
        if (updatedPlayers.canPlayFlag) {
            dispatch(setPlay({play:true}));
        }

        else {
            dispatch(setPlayers({ players: updatedPlayers.players }));
        }

    }


    const walk = async (oldPos, sum, turn) => {
        for (let i = 1; i <= sum; i++) {
            await wait(300);
            dispatch(setPlayers({ players: updatePlayerPos(players, turn, i, oldPos) }));
        }
    }


    return (
        <div className="board-global-container flex center">
            <div className="board-container">
                <Board cards={cards} setCards={setCards} />
                <MessageDisplay card={currentCard}></MessageDisplay>
            </div>
            <div>
                <div className="flex column">
                    <Dice rolledDice={rolledDice} turn={turn} currentPlayerTurn={currentPlayer?.number}></Dice>
                </div>
                {play ? <Button> play </Button> : null}
                {roll ? <Alert sx={{ marginTop: "1rem" }} variant="outlined" severity="success" color="info" icon={false}>player rolled :{roll}</Alert> : null}

            </div>

            <PlayersCards players={players}></PlayersCards>

        </div>
    )
}
