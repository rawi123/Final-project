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
import PlayersCards from './PlayersCards';
import { Alert } from '@mui/material';
import { checkTurnAdvance, wait, updatePlayerPos, playTurn } from './boradFunctionality/boardFunctionality';
import MessageDisplay from './MessageDisplay';
import Play from './Play';

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
        [currentCard, setCurrentCard] = useState({ card: "", sum: "", rnd: "" }),
        dispatch = useDispatch();

    useEffect(() => {
        socket.emit("socket-room", room => {
            if (room[0].slice(0, 4) !== "room") {
                navigate("/game")
            }
        })

        if (socketEnabled) {
            socket.on("player-move", (oldPos, sum, turn, cards, players, updatedPlayers) => {
                if (turn !== currentPlayer.number) {
                    setRoll(sum);
                    setTimeout(() => {
                        setRoll("")
                    }, 4000);
                }
                walk(oldPos, sum, turn, cards, players, updatedPlayers);
            })
        }
    }, [])

    const rolledDice = async (sum, dicesArr) => {
        const oldPos = currentPlayer.pos,
            newPos = (oldPos + sum) % 40,
            currentPlayerTemp = { ...currentPlayer, pos: newPos, money: (oldPos + sum) >= 40 ? currentPlayer.money + 2000 : currentPlayer.money };
        // console.log(newPos);
        const updatedPlayers = playTurn([...players], turn, newPos, cards, pokemons);
        socket.emit("player-move", oldPos, sum, turn, cards, players, updatedPlayers);

        dispatch(setCurrentPlayer({ currentPlayer: currentPlayerTemp }));
        // turnPlay(newPos);

        if (checkTurnAdvance(dicesArr)) {
            //turn advance
        }
    }

    const turnPlay = (updatedPlayers) => {
        const cardTemp = { card: updatedPlayers.card, sum: updatedPlayers.moneyTakeOut, rnd: updatedPlayers.rnd }

        setCurrentCard(cardTemp);
        if (cardTemp.card !== "store" && typeof (cardTemp.card) !== "object") setTimeout(() => setCurrentCard({ card: "" }), 5000);

        if (updatedPlayers.canPlayFlag) {
            dispatch(setPlay({ play: true }));
        }

        else {
            dispatch(setCurrentPlayer({ currentPlayer: updatedPlayers.players[turn] }))
            dispatch(setPlayers({ players: updatedPlayers.players }));
        }

    }


    const walk = async (oldPos, sum, turn, cards, players, updatedPlayers) => {
        let newPlayers;
        for (let i = 1; i <= sum; i++) {
            // await wait(300);
            newPlayers = updatePlayerPos(players, turn, i, oldPos);
            dispatch(setPlayers({ players: newPlayers }));
        }
        turnPlay(updatedPlayers);
    }

    const endTurn = (updatedCurrent = false) => {
        const playersTemp = [...players];
        if (updatedCurrent) {
            playersTemp[turn] = currentPlayer;
            dispatch(setPlayers({ players: playersTemp }));
            //turn ++;
        }
        else {
            //turn++;
        }
    }

    return (
        <div className="board-global-container flex center">

            <div className="board-container">
                <Board cards={cards} setCards={setCards} />
                <MessageDisplay turn={turn} currentPlayer={currentPlayer} card={currentCard}></MessageDisplay>
            </div>
            <div>
                <div className="flex column">
                    <Dice rolledDice={rolledDice} turn={turn} currentPlayerTurn={currentPlayer?.number}></Dice>
                </div>
                {play && currentPlayer.number === turn ? <Play endTurn={endTurn} currentPlayer={currentPlayer} card={currentCard}></Play> : null}
                {roll ? <Alert sx={{ marginTop: "1rem" }} variant="outlined" severity="success" color="info" icon={false}>player rolled :{roll}</Alert> : null}
            </div>

            <PlayersCards currentPlayer={currentPlayer} players={players}></PlayersCards>

        </div>
    )
}
