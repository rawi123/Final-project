

const vaildateUser = ({ username, password }) => {
    if (!username || !password || typeof username !== "string" || typeof password !== "string" || username.length < 3 || password.length < 3 || username.length > 20 || password.length > 20) {
        return false;
    }

    return true
}



module.exports = vaildateUser