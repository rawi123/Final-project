const express = require("express");
const router = new express.Router();
const pokemonController = require("../controllers/pokeController");
const auth = require("../midlleware/auth");

router.post("/add-pokemon", (req, res) => {
    pokemonController.addPokemon(req, res)
})


router.get("/get-pokemons", (req, res) => {
    pokemonController.getAllPokemons(req, res)
})


module.exports = router;