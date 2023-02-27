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

//CREATE MIDDLEWARE (in idealyy should be in it own file)

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'] //we check if the cookie was set (if the user logged in);
    if (!accessToken) {
        return res.status(400).json({error: "USER NOT AUTHENTICATED!!!"})
    }
    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        if (validToken) {
            req.authenticated = true; //push a new key to the request object. now this variable is accessable in the FE
            //console.log("user.usernameuser.usernameuser.username", user.username)
            return next()
        }

    } catch(err) {
        return res.status(400).json({error: err})

    }

}

module.exports = { createTokens, validateToken };

