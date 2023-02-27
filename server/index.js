const express = require("express");
const app = express();
const db = require("./models");
const { Users } = require("./models");
const bcrypt = require('bcrypt');   //npm install bcrypt
const cookieParser = require("cookie-parser");
const { createTokens } = require("./JWT");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());  //every request will have this middleware applying 

app.post("/register", (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {    //npm install bcrypt
        Users.create({
            username: username,
            password: hash,
        }).then(() => {
            res.json("USER REGISTRATED!!!");
        }).catch((err) => {
            if (err) {
                res.status(400).json({error: err});
            }
        });
    });

});

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});
    
    if(!user) {
        res.status(400).json("USER DOESN'T EXIST");
        return
    } 
    
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({error: "WRONG USERNAME AND PASSWORD COMBINATION"});
        } else {
            const accessToken = createTokens(user); //here we create a Token
            //create a cookie in a browser:
            res.cookie("access-token", accessToken, {
                maxAge: 60*60*24*30*1000                
            }) 

            //"access-token" - we give a name of a cookie where wi will store our Token, accessToken, the third argument is an expiration date
            res.json("LOGGED IN");
        }
    });
   
})

app.get("/profile", (req, res) => {
    res.json("profile");
});


db.sequelize.sync().then(() => {
    app.listen(3003, () => {
        console.log("Server running on port 3003")
    });
});