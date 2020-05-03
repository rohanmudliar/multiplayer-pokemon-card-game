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
    };
}, 40);

function startGameEvent(_event) {
    if (_event.keyCode === 13) {
        audio.src = './audios/enter.mp3';
        audio.play();

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

                audio.src = './audios/Theme_song.mp3';
                audio.play();

                audio.addEventListener("ended", () => audio.play());

                modelObj.textTimeout = setTimeout(() => {
                    clearTimeout(modelObj.textTimeout);
                    initScreenDom.classList.add('hidden');
                    startGameDom.classList.add('hidden');
                    gameAreaDom.style.opacity = 1;
                }, 500);

            };
        }, 40);
        document.removeEventListener('keydown', startGameEvent);
    };
};