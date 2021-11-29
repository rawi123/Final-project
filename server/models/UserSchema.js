const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,

    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    gameWon: {
        type: Number,
        default: 0
    },
    extraStr: {
        type: Number,
        default: 0
    },
    pokemons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pokemon",
            default: null
        }
    ],
    money: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN)
    user["tokens"] = user.tokens.concat({ token })
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async (usernameProp, password) => {
    const user = await User.findOne({ username: usernameProp })

    if (!user) {
        throw new Error("Unable to login!")
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login!")
    }
    return user;
}


const User = mongoose.model("users", userSchema);
module.exports = User;