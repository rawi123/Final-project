const Pokemon = require("../models/PokemonSchema")

const addPokemon = async (req, res) => {
    try {

        const { name, hp, attack, def, cost } = req.body;
        const pokemon = new Pokemon({
            name,
            hp,
            attack,
            def,
            cost
        });
        const newPoke = await pokemon.save();
        res.status(200).json(newPoke);
    }

    catch (err) {
        res.status(404).json(err);
    }
}

const getAllPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.status(201).json(pokemons);
    }
    catch (err) {
        res.status(404).json(err);
    }
}



module.exports = {
    addPokemon,
    getAllPokemons,
}