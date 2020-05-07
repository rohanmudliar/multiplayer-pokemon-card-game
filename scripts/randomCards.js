modelObj.renderCards = '';

function createShuffleCardsDom(_pokeArray) {
    for (let i = 1; i <= _pokeArray.length; i++) {
        modelObj.rotateAngle = (Math.floor(Math.random() * 720)) - 360;
        modelObj.renderCards += `
            <div class="gameArea__shuffleCards-card" style="transform: rotate(${modelObj.rotateAngle}deg)">
                <img class="gameArea__shuffleCards-cardBack" src="./images/PokeCardback.png" alt="PokeCardBack">
            </div>`
    };

    shuffleDeck.innerHTML = modelObj.renderCards;
};

const shuffleCards = () => {
    shuffleDeck.removeEventListener('click', shuffleCards);
    const cardDeck = document.querySelectorAll('.gameArea__shuffleCards-card');
    const totalCards = cardDeck.length;
    let counter = 0;
    const shuffleInterval = setInterval(() => {
        if (counter % 2 == 0) {
            cardDeck[counter].style.top = '15rem';
        } else {
            cardDeck[counter].style.top = '-15rem';
        };

        counter++;

        if (counter == totalCards) {
            clearInterval(shuffleInterval);

            const delay = setTimeout(() => {
                clearTimeout(delay);
                shuffleDeck.style.opacity = 0;
                const opacityTimeout = setTimeout(() => {
                    clearTimeout(opacityTimeout);
                    shuffleDeck.classList.add('hidden');
                    gameAreaDom.classList.add('afterShuffling');
                    playerDeck(totalCards);
                }, 1000);
            }, 1000);
        };
    }, 300);
};