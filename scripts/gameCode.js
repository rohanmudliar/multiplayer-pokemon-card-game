var firstPlayBy = Math.floor(Math.random() * 2) + 1;
let detailsDomArray = '';
let currentPhaseNo = 0;


function gameCode() {
    timeout = setTimeout(() => {
        clearTimeout(timeout);
        play();
    }, 2000);
}

function click(e) {
    // console.log(e.currentTarget.classList[0]);
    // console.log(modelObj.pokemonData);
    e.currentTarget.style.border = `2px solid green`;
    for (let i = 0; i < detailsDomArray.length; i++) {
        detailsDomArray[i].classList.remove('detailsHover');
        detailsDomArray[i].removeEventListener('click', click);
    }

    player2.children[currentPhaseNo].children[0].style.transform = `rotateY(0)`;
    player2.children[currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

    var objName = e.currentTarget.classList[0];
    // console.log(objName, modelObj.pokemonData[currentPhaseNo], modelObj.pokemonData[currentPhaseNo][objName])

    // console.log('Player 1', modelObj.pokemonData[currentPhaseNo][objName]);

    // console.log('Player 2', modelObj.pokemonData[currentPhaseNo + 4][objName]);

    var dataOfPlayer1 = modelObj.pokemonData[currentPhaseNo][objName];
    var dataOfPlayer2 = modelObj.pokemonData[currentPhaseNo + 4][objName];



    if (dataOfPlayer1 > dataOfPlayer2) {
        // Player 1 Wins
        playerArea1.children[currentPhaseNo].children[0].classList.add('winner');
        playerArea2.children[currentPhaseNo].children[0].classList.add('looser');
        currentPhaseNo++;
        firstPlayBy = 1;
        setTimeout(() => {
            play();
        }, 2000);

    } else if (dataOfPlayer1 < dataOfPlayer2) {
        // Player 2 wins
        playerArea1.children[currentPhaseNo].children[0].classList.add('looser');
        playerArea2.children[currentPhaseNo].children[0].classList.add('winner');
        currentPhaseNo++;
        firstPlayBy = 2;

        setTimeout(() => {
            play();
        }, 2000);

    } else {
        // Its a draw
        playerArea1.children[currentPhaseNo].children[0].classList.add('draw');
        playerArea2.children[currentPhaseNo].children[0].classList.add('draw');
        currentPhaseNo++;
        firstPlayBy = Math.floor(Math.random() * 2) + 1;
        setTimeout(() => {
            play();
        }, 2000);

    }


}


function play() {
    player1 = eval('playerArea' + firstPlayBy);
    (firstPlayBy == 1) ? player2 = playerArea2 : player2 = playerArea1;

    player1.children[currentPhaseNo].children[0].style.transform = `rotateY(0)`;
    player1.children[currentPhaseNo].children[1].style.transform = `rotateY(-180deg)`;

    player1.classList.remove('active');
    player2.classList.remove('active');
    player1.classList.add('active');

    detailsDomArray = player1.children[currentPhaseNo].children[0].children[0].children[2].children;

    for (let i = 0; i < detailsDomArray.length; i++) {
        detailsDomArray[i].classList.add('detailsHover');
        detailsDomArray[i].addEventListener('click', click);
    }
}