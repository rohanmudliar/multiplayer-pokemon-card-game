const shortid = require('shortid');
const fetch = require('node-fetch');

class Cards {

    constructor() {
        this.cardId = shortid.generate(6);
        this.pokemonData = null;
    };

    getPokemonData(callback) {
        fetchPokemon(result => {
            this.pokemonData = result;
            callback(this);
        });
    };
};

function fetchPokemon(callback) {
    let randomNumberArray = [];
    const promises = [];

    for (let i = 1; i <= 8; i++) {
        randomNumberArray.push(Math.floor(Math.random() * 149) + 1)
        const url = `https://pokeapi.co/api/v2/pokemon/${randomNumberArray[i - 1]}`;
        promises.push(fetch(url).then(response => { return response.json(); }));

    };

    Promise.all(promises).then(results => {
        const pokemonData = results.map(data => ({
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
        callback(pokemonData);
    });
}

module.exports = Cards;