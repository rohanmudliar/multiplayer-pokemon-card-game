const initScreenDom = document.getElementById('initScreen'),
    startGameDom = document.getElementById('initScreen__description'),
    gameAreaDom = document.getElementById('gameArea'),
    shuffleDeck = document.getElementById('gameArea__shuffleCards'),
    playerArea1 = document.getElementById('gameArea__player1'),
    playerArea2 = document.getElementById('gameArea__player2');

const audio = new Audio();

const modelObj = {
    startGameText: 'Press Enter to start the game.',
    startGameTextArray: [],
    textArray: [],
    textInternal: null,
    textCounter: '',
    textTimeout: null,
    renderCards: '',
    pokemonData: null,
    player1DeckDisplay: '',
    player2DeckDisplay: '',
};







