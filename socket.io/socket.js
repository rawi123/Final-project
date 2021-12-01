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
        if (io.sockets.adapter.rooms.get(room).size <= 2) {
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

    socket.on("send-message", (message, room, user) => {
        socket.broadcast.to(room).emit("recive-message", message, user,socket.id)
    })
})


const getRooms = () => {
    let arr = Array.from(io.sockets.adapter.rooms);
    arr = arr.filter(val => val[0].slice(0, 4) === "room");
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
