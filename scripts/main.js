const initScreenDom = document.getElementById('initScreen'),
    startGameDom = document.getElementById('initScreen__description'),
    gameAreaDom = document.getElementById('gameArea');

const audio = new Audio();

const modelObj = {
    startGameText: 'Press Enter to start the game.',
    startGameTextArray: [],
    textArray: [],
    textInternal: null,
    textCounter: '',
    textTimeout: null,
};







