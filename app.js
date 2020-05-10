const path = require('path');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const router = express.Router();

const Player = require('./models/player');
const Card = require('./models/cards');
const Game = require('./models/game');

app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);

const expressServer = app.listen(8888, () => {
    console.log("server-running");
});

const io = socketio(expressServer);

new Card().getPokemonData(result => {
    const cardData = result;
    const GameRoom = new Game();
    GameRoom.setSocket(io);

    io.on('connection', (socket) => {
        if (Player.GetPlayerCount() <= 2) {
            socket.emit('cardData', cardData);
            let MainPlayer;
            socket.on('joinServer', (callback) => {
                MainPlayer = new Player();
                callback(MainPlayer);
                GameRoom.AddPlayer(MainPlayer);
            });

            socket.on('gameLogicClick', (data) => {
                socket.broadcast.emit('gameLogicClick', data);
            });

            socket.on('disconnect', () => {
                if (MainPlayer) {
                    Player.Remove(MainPlayer);
                    GameRoom.RemovePlayer(MainPlayer);
                };
            });
        };
    });
});