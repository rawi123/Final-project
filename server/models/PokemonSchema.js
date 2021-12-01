const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    hp: {
        type: Number,
        required: true,
    },
    attack: {
        type: Number,
        required: true
    },
    def: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})




const Pokemon = mongoose.model("pokemon", pokemonSchema);
module.exports = Pokemon;