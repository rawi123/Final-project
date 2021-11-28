const express = require("express");
const router = new express.Router();
const pokemonController = require("../controllers/pokeController");
const auth = require("../midlleware/auth");




module.exports = router;