import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';
import socket from '../../api/socket';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentPlayer } from "../../redux/slices/currentPlayerSlices"
import { addPlayer } from "../../redux/slices/playersSlices";

export default function Room({ roomProp, setTableClass }) {
    const [room, setRoom] = useState(roomProp)
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useSelector(state => state?.user);
    const [images]=useState(['black','blue','yellow']);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const divRef = useRef(null);

    useEffect(() => {
        socket.on("roomUpdate", (newRoom) => {
            setRoom(newRoom);
        })
        socket.on("recive-message", (message, user, socketRecive, allMessages) => {
            if (socketRecive === socket.id)
                return
            setMessages([...allMessages, { message, direction: "left", sender: user }]);
        })
        console.log(socket.id)



        socket.on("play-game", (roomData) => {
            roomData.map((val, i) => {
                const player = {number:i, img:images[i], pos:1, socketId:socket.id, pokemons:[], ownedLands:[],money:3000};
                if (socket.id === val) {
                    player.pokemons = user.pokemons;
                    dispatch(setCurrentPlayer({ currentPlayer: player }));
                }
                dispatch(addPlayer({player}))

            })
            navigate("/game-playing-online");
        })

    }, [])

    const sendMessage = () => {
        if (input === "") return
        socket.emit("send-message", input, room[0], user.username, messages)
        setMessages([...messages, { message: input, direction: "right", sender: user.username }])
        setInput("");
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }

    const leaveRoom = () => {
        socket.emit("leave-room", room[0])
        setTableClass("");
    }

    const startGame = () => {
        socket.emit("start-game", room[0])
    }

    return (
        <>
            <div className="flex center column">
                <h2 >{room[0]}</h2>
                <h2 >{room[1].length}/3</h2>
            </div>
            <Button onClick={leaveRoom} variant="contained" sx={{ background: "#000000", position: "absolute", width: "100%", bottom: "0", '&:hover': { backgroundColor: '#5EC1F0' } }}>Leave Room</Button>
            <Grid>
                <List ref={divRef} className="send-message" sx={{ height: "80%" }}>
                    {messages.map((val, i) => <ListItem key={i}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align={val.direction} primary={val.message}></ListItemText>
                                <ListItemText align={val.direction} primary={val.sender}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>)}
                </List>
                <Divider />
                <Grid container style={{ padding: '20px', position: "sticky", bottom: "130px" }}>
                    <Grid item xs={11}>
                        <TextField onKeyDown={(e) => { if (e.code === "Enter") sendMessage() }} id="outlined-basic-email" label="Type Something" value={input} fullWidth onChange={(e) => setInput(e.target.value)} />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
            {socket.id === room[1][0] ? <Button onClick={startGame} variant="contained" style={{ background: "#000000", width: "100%", opacity: 0.9, color: "white" }}>Play</Button> : null}

        </>
    )
}
