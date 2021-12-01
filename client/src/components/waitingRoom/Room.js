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

export default function Room({ roomProp, setTableClass }) {
    const [room, setRoom] = useState(roomProp)
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useSelector(state => state?.user);
    const divRef = useRef(null);
    
    useEffect(() => {
        socket.on("roomUpdate", (newRoom) => {
            setRoom(newRoom);
        })
        socket?.on("recive-message", (message, user, socketRecive) => {

            if (socketRecive === socket.id)
                return
            console.log(messages)

            setMessages([...messages, { message, direction: "left", sender: user }]);
        })
    }, [])



    useEffect(() => {

    }, [messages])



    const sendMessage = () => {
        if (input === "") return
        socket.emit("send-message", input, room[0], user.username)
        setMessages([...messages, { message: input, direction: "right", sender: user.username }])
        setInput("");
        divRef.current.scrollTop = divRef.current.scrollHeight;
    }

    const leaveRoom = () => {
        socket.emit("leave-room", room[0])
        setTableClass("");
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
                <Grid container style={{ padding: '20px', position: "sticky", bottom: "100px" }}>
                    <Grid item xs={11}>
                        <TextField onKeyDown={(e) => { if (e.code === "Enter") sendMessage() }} id="outlined-basic-email" label="Type Something" value={input} fullWidth onChange={(e) => setInput(e.target.value)} />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab onClick={sendMessage} color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
