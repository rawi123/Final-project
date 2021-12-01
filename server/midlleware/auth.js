const jwt = require("jsonwebtoken");
const User=require("../models/UserSchema")

const auth = async (req, res, next) => {
    try {

        const userToken = req.header("Authorization").replace("Bearer ", "");
        const verify = jwt.verify(userToken, process.env.TOKEN);
        const loggedUser = await User.findOne({ _id: verify._id, "tokens.token": userToken }).populate("pokemons").exec();
        if (!loggedUser)
            throw ("")
        if(req.url!=="/logout" &&req.url!=="/me"&&loggedUser.username==="Guest"){
            throw ("Cant preform Actions on guest")
        }
        req.user = loggedUser;
        req.token = userToken;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "please authenticate" })
    }
}


module.exports = auth