modelObj.startGameTextArray = modelObj.startGameText.split('');

document.addEventListener('keydown', startGameEvent);

modelObj.textCounter = -1;
modelObj.textInternal = setInterval(() => {
    modelObj.textCounter++;
    if (modelObj.startGameTextArray[modelObj.textCounter]) {
        startGameDom.innerHTML = startGameDom.innerHTML + modelObj.startGameTextArray[modelObj.textCounter];
        modelObj.textArray.push(startGameDom.innerHTML);
    } else {
        clearInterval(modelObj.textInternal);
        fetchPokemon();
    };
}, 40);
/*
* This function executes when there is a keydown event.
* @param _event is of type object. It passes the event.
*/
function startGameEvent(_event) {
    if (_event.keyCode === 13) {
        enterSound.src = './audios/enter.mp3';
        enterSound.play();

        startGameDom.innerHTML = modelObj.textArray[modelObj.textArray.length - 1];
        modelObj.textCounter = modelObj.textArray.length;

        modelObj.textInternal = setInterval(() => {
            modelObj.textCounter--;
            if (modelObj.textArray[modelObj.textCounter]) {
                startGameDom.innerHTML = modelObj.textArray[modelObj.textCounter];
            } else {
                clearInterval(modelObj.textInternal);
                startGameDom.innerHTML = '';
                initScreenDom.style.opacity = 0;

                themeSong.src = './audios/Theme_song.mp3';
                themeSong.volume = 0.2;
                themeSong.play();

                themeSong.addEventListener("ended", () => themeSong.play());

                modelObj.textTimeout = setTimeout(() => {
                    clearTimeout(modelObj.textTimeout);
                    initScreenDom.classList.add('hidden');
                    startGameDom.classList.add('hidden');
                    gameAreaDom.classList.remove('hidden');
                    gameAreaDom.style.opacity = 1;
                    shuffleDeck.addEventListener('click', shuffleCards);
                }, 500);
            };
        }, 40);
        document.removeEventListener('keydown', startGameEvent);
    };
};