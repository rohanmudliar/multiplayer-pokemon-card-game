
class Game {
    constructor() {
        this.Players = [];
        this.socket = null;
    }

    startGame() {
        if (this.Players.length == 2) {
            const firstPlayBy = Math.floor(Math.random() * 2) + 1; //1 2
            this.Players[0].setPlayerTurn(1);
            this.Players[1].setPlayerTurn(2);

            this.socket.emit('startGame', this.Players);

            this.socket.emit('firstPlayBy', firstPlayBy);
        };
    }

    setSocket(io) {
        this.socket = io;
    }

    AddPlayer(player) {
        this.Players.push(player);
        this.socket.emit('playerConnected', this.Players);
        this.startGame();
    }

    RemovePlayer(player) {
        this.Players.splice(this.Players.findIndex(Aplayer => Aplayer.id == player.id), 1);
        this.socket.emit('playerConnected', this.Players);
    }
}

module.exports = Game;