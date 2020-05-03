modelObj.renderCards = '';

function createShuffleCardsDom(_pokeArray) {
    for (var i = 1; i <= 20; i++) {
        modelObj.renderCards += `
            <div class="gameArea__shuffleCards-card" style="transform: rotate(${(Math.floor(Math.random() * 720)) - 180}deg)">
                <img class="gameArea__shuffleCards-cardBack c1" src="./images/PokeCardback.png" alt="PokeCardBack">
            </div>`
    };

    shuffleDeck.innerHTML = modelObj.renderCards;
};