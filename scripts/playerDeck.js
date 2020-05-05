const playerDeck = (totalCards) => {
    for (var i = 1; i <= totalCards; i++) {
        if (i < totalCards / 2) {
            modelObj.player1DeckDisplay += `<div class="gameArea__player1-card">
                <img class="gameArea__player1-cardBack" src="./images/PokeCardback.png" alt="PokeCardBack">
            </div>`
            continue;
        };

        modelObj.player2DeckDisplay += `<div class="gameArea__player2-card">
                    <img class="gameArea__player2-cardBack" src="./images/PokeCardback.png" alt="PokeCardBack">
                </div>`

    };

    playerArea1.innerHTML = modelObj.player1DeckDisplay;
    playerArea2.innerHTML = modelObj.player2DeckDisplay;
};