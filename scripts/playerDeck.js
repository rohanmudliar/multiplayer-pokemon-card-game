/*
* This function is executed when the deck of cards is shuffled.
* @param _totalCards is of type array. Pass the pokedata array.
*/
const playerDeck = (_totalCards) => {
    for (var i = 1; i <= _totalCards; i++) {
        if (i <= _totalCards / 2) {
            modelObj.player1DeckDisplay += cardDomSkeleton(modelObj.pokemonData[i - 1]);
            continue;
        };

        modelObj.player2DeckDisplay += cardDomSkeleton(modelObj.pokemonData[i - 1]);
    };
    choosePokemonSound.src = './audios/out.mp3';
    choosePokemonSound.volume = 0.2;
    choosePokemonSound.play();

    playerArea1.innerHTML = modelObj.player1DeckDisplay;
    playerArea2.innerHTML = modelObj.player2DeckDisplay;
    playerArea1.classList.remove('hidden');
    playerArea2.classList.remove('hidden');

    choosePokemonSound.addEventListener("loadeddata", () => {
        playerArea1.style.opacity = 1;
        playerArea2.style.opacity = 1;

        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            playGame();
        }, 2000);
    });
};
/*
* This function is used to create a single Poke Card
* @param _pokeData is of type object. Pass the pokedata as a object and it returns a DOM card.
*/
function cardDomSkeleton(_pokeData) {
    const { id, name, hp, speed, attack, defence, type } = _pokeData;

    return `<div class="card">
                <div class="cardFrontSide">
                    <div class="cardContainer ${type}">
                        <div class="header">
                            <div class="pokemonName">
                                ${name}
                            </div>
                        </div>
                        <div class="pokemonSprite">
                            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${threeDigitConverter(id)}.png">
                        </div>
                        <div class="pokemonDetails">
                            <div class="hp">
                                <p>Hp</p>
                                <p>:</p>
                                <p>${hp}</p>
                            </div>
                            <div class="speed">
                                <p>Speed</p>
                                <p>:</p>
                                <p>${speed}</p>
                            </div>
                            <div class="attack">
                                <p>Attack</p>
                                <p>:</p>
                                <p>${attack}</p>
                            </div>
                            <div class="defence">
                                <p>Defence</p>
                                <p>:</p>
                                <p>${defence}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cardBackSide">
                </div>
            </div>`
};