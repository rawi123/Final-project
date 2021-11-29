const express = require("express");
const router = new express.Router();
const userController = require("../controllers/userController");
const auth = require("../midlleware/auth");


router.post("/register", (req, res) => {
    userController.register(req, res)
})

router.post("/login", (req, res) => {
    userController.login(req, res)
})

router.post("/logout", auth,(req, res) => {
    userController.logout(req, res)
})

router.post("/add-game",auth,(req,res)=>{
    userController.addGame(req, res)
})

router.post("/add-win",auth,(req,res)=>{
    userController.addWin(req, res)
})

router.post("/add-pokemon/:id",auth,(req,res)=>{
    userController.addPokemon(req, res)
})

router.get("/me", auth, (req, res) => {
    res.status(200).json(req.user)
})






module.exports = router;