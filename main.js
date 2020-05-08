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
    playerArea2 = document.getElementById('gameArea__player2');
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
};