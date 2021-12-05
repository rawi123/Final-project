const io = require("socket.io")(process.env.PORT || 5000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

let latestRoom = 1;

io.on("connection", socket => {


    socket.on('create', (callback) => {
        const room = "room" + latestRoom
        socket.join(room)
        latestRoom++;
        io.emit('return-rooms', getRooms());
        callback([room, [...io.sockets.adapter.rooms.get(room)]]);
    });

    socket.on("join-room", (room, callback) => {
        leaveLastRoom(socket);
        if (io.sockets.adapter.rooms.get(room).size <= 3) {
            socket.join(room);
            io.emit('return-rooms', getRooms());
            const joinedPeople = [...io.sockets.adapter.rooms.get(room)];
            io.to(room).emit("roomUpdate", [room, joinedPeople]);
            callback([room, joinedPeople]);
        }
    })

    socket.on("leave-last-room", () => {
        leaveLastRoom(socket);
    })

    socket.on("leave-room", (room) => {
        socket.leave(room);
        if (io.sockets.adapter.rooms.get(room)) {
            const joinedPeople = [...io.sockets.adapter.rooms.get(room)];
            io.to(room).emit("roomUpdate", [room, joinedPeople]);
        }
        io.emit('return-rooms', getRooms());
    })

    socket.on("get-rooms", () => {
        io.emit('return-rooms', getRooms());
    })

    socket.on("start-game", (room) => {
        const roomData = io.sockets.adapter.rooms.get(room);
        // if (roomData.size >= 2) {
        io.emit('return-rooms', getRooms());
        io.to(room).emit("play-game", [...roomData]);
        roomData.add("playing");
        // }
    })

    socket.on("send-message", (message, room, user, allMessages) => {
        allMessages = allMessages.map(val => {
            val["direction"] = val["direction"] === "left" ? "right" : "left"
            return val
        })
        socket.broadcast.to(room).emit("recive-message", message, user, socket.id, allMessages)
    })

    socket.on("socket-room", (cb) => {
        cb(Array.from(socket.rooms));
    })

    socket.on("player-move", (oldPos, sum, turn,cards,players,updatedPlayers) => {
        io.to([...socket.rooms][0]).emit("player-move", oldPos, sum, turn,cards,players,updatedPlayers)
    })
})


const getRooms = () => {
    let arr = Array.from(io.sockets.adapter.rooms);
    arr = arr.filter(val => val[0].slice(0, 4) === "room" &&
        val[0].slice(arr[0].length - 7) !== "playing" &&
        Array.from(val[1]).pop() !== "playing");

    arr = arr.map(val => {
        val[1] = Array.from(val[1]);
        return val
    })

    return arr
}

const leaveLastRoom = (socket) => {
    if (Array.from(socket.rooms).length) {
        const lastValue = Array.from(socket.rooms).pop();
        socket.leave(lastValue)
    }
}
