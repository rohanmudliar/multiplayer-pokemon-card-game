// ////////////////////////////////////////////////////////////////////////////////////
// Developed By : Rohan Mudliar
// Name : PokeCard Game
// Created on : 04/05/2020
// ///////////////////////////////////////////////////////////////////////////////////
/*
* Initializing the domVariables.
*/
const initScreenDom = document.getElementById('initScreen'),
    startGameDom = document.getElementById('initScreen__description'),
    gameAreaDom = document.getElementById('gameArea'),
    shuffleDeck = document.getElementById('gameArea__shuffleCards'),
    playerArea1 = document.getElementById('gameArea__player1'),
    playerArea2 = document.getElementById('gameArea__player2'),
    player1Avatar = document.getElementById('player1Avatar'),
    player2Avatar = document.getElementById('player2Avatar'),
    playerName1 = document.getElementById('playerName1'),
    playerName2 = document.getElementById('playerName2');
/*
* Creating audio instance.
*/
const enterSound = new Audio(),
    themeSong = new Audio(),
    choosePokemonSound = new Audio();
/*
* Initializing the public Variables.
*/
const modelObj = {
    startGameText: 'Press Enter to start the game.',
    startGameTextArray: [],
    textArray: [],
    textInternal: null,
    textCounter: '',
    textTimeout: null,
    rotateAngle: 0,
    renderCards: '',
    pokemonData: null,
    player1DeckDisplay: '',
    player2DeckDisplay: '',
    detailsDomArray: '',
    currentPhaseNo: 0,
    firstPlayBy: null,
    randomNumberArray: [],
    playerId: null,
    owner: null,
};

const socket = io();

socket.on('connect', () => {
    console.log("connected to server");
})

socket.on('cardData', (data) => {
    modelObj.pokemonData = data.pokemonData;
    createShuffleCardsDom(data.pokemonData);
})


socket.on("playerConnected", data => {
    player1Avatar.classList.add('hidden');
    player2Avatar.classList.add('hidden');


    if (data.length == 2) {
        player1Avatar.classList.remove('hidden');
        player2Avatar.classList.remove('hidden');
        setTimeout(() => {
            shuffleCards();
        }, 4000);
    } else {
        data.forEach(player => {
            if (player.name == 'Player1')
                player1Avatar.classList.remove('hidden');
            else
                player2Avatar.classList.remove('hidden');
        });
    };
});

socket.on('startGame', data => {
    data.forEach((player, i) => {
        if (player.id === modelObj.playerId) {
            modelObj.owner = player.playerTurn;
        };
    });
});

socket.on('firstPlayBy', data => {
    modelObj.firstPlayBy = data;
});

socket.on('gameLogicClick', data => {
    renderDisplay(data.val1, data.val2, data.whoPlays);
});

