const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => { return response.json(); }));

    };
    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join(', '),
            speed: data.stats[0].base_stat,
            specialDefense: data.stats[1].base_stat,
            specialAttack: data.stats[2].base_stat,
            defense: data.stats[3].base_stat,
            attack: data.stats[4].base_stat,
            hp: data.stats[5].base_stat
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    shuffleArray(pokemon);
    createShuffleCardsDom(pokemon)
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