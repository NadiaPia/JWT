//CREATE TOKEN

const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {                   //Token is an object with the information (payload)
    const accessToken = sign(
        { username: user.username, is: user.id}, //user is from login handler in index.js, process.env.SECRET_KEY
        process.env.SECRET_KEY
        //"jwtsecret"
    );

    return accessToken;
};

module.exports = { createTokens };

