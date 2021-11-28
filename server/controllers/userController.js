const User = require("../models/UserSchema");
const vaildateUser = require("../midlleware/validate");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {

        if (!vaildateUser(req.body)) {
            throw ("User or password is invalid!")
        }

        const user = await User.findOne({ username: req.body.username })
        if (user) {
            throw ("User alreday exists");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const userModel = new User({
            username: req.body.username,
            password: hashedPassword
        })

        const newUser = await userModel.save();
        res.status(200).json(newUser);

    }
    catch (err) {
        res.status(404).json(err)
    }
}


const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    }
    catch (err) {
        res.status(404).json(`${err}`)
    }
}

const addWin=async(req,res)=>{
    try{
        const user=req.user;
        user.extraStr+=0.5;
        user.gameWon+=1;
        user.gamesPlayed+=1;
        const newUser=await user.save();
        res.status(200).json(newUser);
    }
    catch(err){
        res.status(404).json(err)
    }
}

const addGame=async (req,res)=>{
    try{
        const user=req.user;
        user.gamesPlayed+=1;
        const newUser=await user.save();
        res.status(200).json(newUser);
    }
    catch(err){
        res.status(404).json(err)
    }
}


module.exports = {
    login,
    register,
    addGame,
    addWin
}