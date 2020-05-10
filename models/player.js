const shortid = require('shortid');
const Players = [];

class Player {
    constructor() {
        this.name = 'Player' + (Players.length + 1);
        this.id = shortid.generate(6);
        this.playerTurn = undefined;
        Players.push(this);
    }

    setPlayerTurn(turnNo) {
        this.playerTurn = turnNo;
    }

    static Remove({ id }) {
        let index = Players.findIndex(player => player.id === id);
        if (index !== -1) {
            Players.splice(index, 1);
        }
    }

    static GetPlayerCount() {
        return Players.length;
    }
}

module.exports = Player;