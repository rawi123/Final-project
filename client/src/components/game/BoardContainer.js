import React, { useState, useEffect } from 'react'
import Board from './Board';
import "./style.css";
import { useNavigate } from 'react-router';
import socket from '../../api/socket';
import Dice from "./Dice";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlayer } from "../../redux/slices/currentPlayerSlices";
import { setPlayers } from "../../redux/slices/playersSlices";
import { setTurn } from '../../redux/slices/turnSlices';
import PlayersCards from './PlayersCards';
import { Alert } from '@mui/material';
import { wait, updatePlayerPos, playTurn, setFreeFromJail } from './boradFunctionality/boardFunctionality';
import MessageDisplay from './MessageDisplay';
import Play from './Play';

export default function BoardContainer() {
    const navigate = useNavigate(),
        { turn } = useSelector(state => state.turn),
        { currentPlayer } = useSelector(state => state.currentPlayer),
        { players } = useSelector(state => state.players),
        { socketEnabled } = useSelector(state => state.socketEnabled),
        { pokemons } = useSelector(state => state.pokemons),
        [roll, setRoll] = useState(""),
        [cards, setCards] = useState([]),
        [playerPlayingTurn, setPlayerPlayingTurn] = useState(),
        [enablePlay, setEnablePlay] = useState(false),
        [enableDice, setEnableDice] = useState(false),
        [diceRoll, setDiceRoll] = useState([]),
        [currentCard, setCurrentCard] = useState({ card: "", sum: "", rnd: "" }),
        dispatch = useDispatch();

    useEffect(() => {
        if (currentPlayer && turn === currentPlayer.number) setEnableDice(true);
        socket.emit("socket-room", room => {
            if (room[0].slice(0, 4) !== "room") {
                navigate("/game")
            }
        })

        if (socketEnabled) {
            socket.on("player-move", (oldPos, sum, turn, cards, players, updatedPlayers, diceArr) => {
                if (turn === currentPlayer.number && currentPlayer.jail) {
                    const jailFree = setFreeFromJail(players, currentPlayer);
                    dispatch(setCurrentPlayer({ currentPlayer: jailFree.player }))
                    dispatch(setPlayers({ players: jailFree.allPlayers }));
                    socket.emit("next-turn", turn, jailFree.allPlayers);
                }
                else {
                    setDiceRoll(diceArr);
                    setPlayerPlayingTurn(turn);
                    if (turn !== currentPlayer.number) {
                        setRoll(sum);
                        setTimeout(() => {
                            setRoll("")
                        }, 4000);
                    }
                    walk(oldPos, sum, turn, cards, players, updatedPlayers, diceArr);
                }
            })
            socket.on("next-turn", async (turn, players) => {
                if (turn === currentPlayer.number) setEnableDice(true);
                dispatch(setTurn(turn))
                dispatch(setPlayers({ players }))
            })
        }// eslint-disable-next-line
    }, [])

    const rolledDice = async (sum, dicesArr) => {
        setEnableDice(false);
        const oldPos = currentPlayer.pos,
            newPos = (oldPos + sum) % 40,
            currentPlayerTemp = { ...currentPlayer, pos: newPos, money: (oldPos + sum) >= 40 ? currentPlayer.money + 2000 : currentPlayer.money };
        const updatedPlayers = playTurn([...players], turn, newPos, cards, pokemons);
        console.log(updatedPlayers.players);
        socket.emit("player-move", oldPos, sum, turn, cards, players, updatedPlayers, dicesArr);

        dispatch(setCurrentPlayer({ currentPlayer: currentPlayerTemp }));
    }

    const walk = async (oldPos, sum, turn, cards, players, updatedPlayers, diceArr) => {
        let newPlayers;
        for (let i = 1; i <= sum; i++) {
            await wait(300);
            newPlayers = updatePlayerPos(players, turn, i, oldPos);
            dispatch(setPlayers({ players: newPlayers }));
        }
        turnPlay(updatedPlayers, turn, diceArr);
    }

    const turnPlay = async (updatedPlayers, turn, diceArr) => {
        const cardTemp = { card: updatedPlayers.card, sum: updatedPlayers.moneyTakeOut, rnd: updatedPlayers.rnd }
        setCurrentCard(cardTemp);
        if (cardTemp.card !== "store" && typeof (cardTemp.card) !== "object") setTimeout(() => {
            setCurrentCard({ card: "" })
        }, 4000);


        if (updatedPlayers.canPlayFlag && turn === currentPlayer.number) {
            setEnablePlay(true);
        }

        else {
            if (turn === currentPlayer.number)
                dispatch(setCurrentPlayer({ currentPlayer: updatedPlayers.players[turn] }))
            dispatch(setPlayers({ players: updatedPlayers.players }));
            endTurn([...updatedPlayers.players], false, turn, diceArr);
        }

    }


    const endTurn = async (playersTemp, currentPlayer = false, turnProp, diceArr = false) => {
        setEnablePlay(false);
        if (!playersTemp) {
            playersTemp = [...players];
            playersTemp[turnProp] = currentPlayer;
            dispatch(setPlayers({ players: playersTemp }));
        }

        if (diceArr) {
            if (diceArr[0] === diceArr[1]) {
                socket.emit("next-turn", turnProp - 1, playersTemp);
            }
            else {
                socket.emit("next-turn", turnProp, playersTemp);
            }
        }
        else if (diceRoll[0] === diceRoll[1]) {
            socket.emit("next-turn", turnProp - 1, playersTemp);
        }
        else {
            socket.emit("next-turn", turnProp, playersTemp);
        }

    }

    return (
        <div className="board-global-container flex center">

            <div className="board-container">
                <Board cards={cards} setCards={setCards} />
                <MessageDisplay turn={playerPlayingTurn} currentPlayer={currentPlayer} card={currentCard}></MessageDisplay>
            </div>
            <div>
                <div className="flex column">
                    <Dice rolledDice={rolledDice} turn={turn} enableDice={enableDice} currentPlayerTurn={currentPlayer?.number}></Dice>
                </div>
                {enablePlay && currentPlayer.number === turn ? <Play endTurn={endTurn} turn={turn} currentPlayer={currentPlayer} card={currentCard}></Play> : null}
                {roll ? <Alert sx={{ marginTop: "1rem" }} variant="outlined" severity="success" color="info" icon={false}>player rolled :{roll}</Alert> : null}
            </div>

            <PlayersCards currentPlayer={currentPlayer} players={players}></PlayersCards>

        </div>
    )
}
