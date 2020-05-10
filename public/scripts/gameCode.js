/*
* This function is used start the user interaction for selecting the card.
*/
function playGame() {
    if (modelObj.owner === modelObj.firstPlayBy) {
        console.log('if');
        player1 = eval('playerArea' + modelObj.firstPlayBy);
        (modelObj.firstPlayBy == 1) ? player2 = playerArea2 : player2 = playerArea1;

        player1.children[modelObj.currentPhaseNo].children[0].style.transform = `rotateY(0)`;
        player1.children[modelObj.currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

        player1.classList.remove('active');
        player2.classList.remove('active');
        player1.classList.add('active');

        modelObj.detailsDomArray = (document.querySelectorAll(`.${player1.classList[0]} .pokemonDetails`));

        for (let i = 0; i < 4; i++) {
            modelObj.detailsDomArray[modelObj.currentPhaseNo].children[i].classList.add('detailsHover');
            modelObj.detailsDomArray[modelObj.currentPhaseNo].children[i].addEventListener('click', gameLogic);
        };
    } else {
        player2 = eval('playerArea' + modelObj.firstPlayBy);
        (modelObj.firstPlayBy == 1) ? player1 = playerArea2 : player1 = playerArea1;

        player1.children[modelObj.currentPhaseNo].children[0].style.transform = `rotateY(0)`;
        player1.children[modelObj.currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

        player1.classList.remove('active');
        player2.classList.remove('active');

        if (modelObj.owner != modelObj.firstPlayBy) {
            player2.classList.add('active');
        };
    };
};
/*
* This function is used to execute who wins based on selection.
* @param _event is of type object. It passes the event.
*/

let result = [];

function gameLogic(_event) {
    _event.currentTarget.style.border = `2px solid green`;

    for (let i = 0; i < modelObj.detailsDomArray.length; i++) {
        modelObj.detailsDomArray[modelObj.currentPhaseNo].children[i].classList.remove('detailsHover');
        modelObj.detailsDomArray[modelObj.currentPhaseNo].children[i].removeEventListener('click', gameLogic);
    };

    player2.children[modelObj.currentPhaseNo].children[0].style.transform = `rotateY(0)`;
    player2.children[modelObj.currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

    const objName = _event.currentTarget.classList[0];

    const dataOfPlayer1 = modelObj.pokemonData[modelObj.currentPhaseNo][objName];
    const dataOfPlayer2 = modelObj.pokemonData[modelObj.currentPhaseNo + 4][objName];

    if (modelObj.owner == modelObj.firstPlayBy) {

        if (dataOfPlayer1 > dataOfPlayer2) {
            // Player 1 Wins
            socket.emit('gameLogicClick', { 'val1': 'winner', 'val2': 'looser', 'whoPlays': 1 });
            renderDisplay('winner', 'looser', 1);
        } else if (dataOfPlayer1 < dataOfPlayer2) {
            // Player 2 wins
            socket.emit('gameLogicClick', { 'val1': 'winner', 'val2': 'looser', 'whoPlays': 2 });
            renderDisplay('looser', 'winner', 2);
        } else {
            // Its a draw
            const randomNum = Math.floor(Math.random() * 2) + 1;
            socket.emit('gameLogicClick', { 'val1': 'winner', 'val2': 'looser', 'whoPlays': randomNum });
            renderDisplay('draw', 'draw', randomNum);
        };
    }
};
/*
* This function is used to render the screen based on who wins.
* @param _classFirst is of type string. Pass the name of the class that needs to be added to player 1.
* @param _classSecond is of type string. Pass the name of the class that needs to be added to player 2.
* @param _whoPlays is of type number. Pass the number who plays next.
*/
function renderDisplay(_classFirst, _classSecond, _whoPlays) {
    player2.children[modelObj.currentPhaseNo].children[0].style.transform = `rotateY(0)`;
    player2.children[modelObj.currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;
    player1.children[modelObj.currentPhaseNo].children[0].style.transform = `rotateY(0)`;
    player1.children[modelObj.currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

    if (_whoPlays === 1) {
        playerArea1.children[modelObj.currentPhaseNo].children[0].classList.add('winner');
        playerArea2.children[modelObj.currentPhaseNo].children[0].classList.add('looser');
    } else {
        playerArea2.children[modelObj.currentPhaseNo].children[0].classList.add('winner');
        playerArea1.children[modelObj.currentPhaseNo].children[0].classList.add('looser');
    };

    modelObj.currentPhaseNo++;
    modelObj.firstPlayBy = _whoPlays;
    const playTimeout = setTimeout(() => {
        clearTimeout(playTimeout);
        if (modelObj.currentPhaseNo < modelObj.pokemonData.length / 2)
            playGame();
    }, 2000);
}