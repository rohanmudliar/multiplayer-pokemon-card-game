modelObj.renderCards = '';

function createShuffleCardsDom(_pokeArray) {
    let randomNo = Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i <= _pokeArray.length - 70; i++) {
        if (i % randomNo == 0) {
            rotateAngle = (Math.floor(Math.random() * 180)) - 90;
            randomNo = Math.floor(Math.random() * 9) + 1
        } else {
            rotateAngle = 0;
        }
        modelObj.renderCards += `
            <div class="gameArea__shuffleCards-card" style="transform: rotate(${rotateAngle}deg)">
                <img class="gameArea__shuffleCards-cardBack" src="./images/PokeCardback.png" alt="PokeCardBack">
            </div>`
    };

    shuffleDeck.innerHTML = modelObj.renderCards;
    shuffleDeck.addEventListener('click', shuffleCards);
};

const shuffleCards = () => {
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
            shuffleDeck.removeEventListener('click', shuffleCards);

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
    }, 80) //80
}