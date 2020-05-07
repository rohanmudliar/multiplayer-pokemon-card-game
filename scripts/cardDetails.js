const randomNumberArray = [];

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 8; i++) {
        randomNumberArray.push(Math.floor(Math.random() * 149) + 1)
        const url = `https://pokeapi.co/api/v2/pokemon/${randomNumberArray[i - 1]}`;
        promises.push(fetch(url).then(response => { return response.json(); }));

    };
    Promise.all(promises).then(results => {
        modelObj.pokemonData = results.map(data => ({
            name: data.name,
            id: data.id,
            // type: data.types.map(type => type.type.name).join(', '),
            type: data.types[data.types.length - 1].type.name,
            speed: data.stats[0].base_stat,
            specialDefense: data.stats[1].base_stat,
            specialAttack: data.stats[2].base_stat,
            defence: data.stats[3].base_stat,
            attack: data.stats[4].base_stat,
            hp: data.stats[5].base_stat
        }));
        createShuffleCardsDom(modelObj.pokemonData);
    });
};

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

function shuffleArray(array) {
    // This is implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates.
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
};