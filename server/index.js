const express = require("express");
const app = express();
const db = require("./models");
const { Users } = require("./models");
const bcrypt = require('bcrypt');

app.use(express.json());

app.post("/register", (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {    //npm install bcrypt
        Users.create({
            username: username,
            password: hash,
        }).then(() => {
            res.json("USER REGISTRATED!!!");
        }).catch((error) => {
            if (err) {
                res.status(400).json({error: err});
            }
        });
    });

});

app.post("/login", (req, res) => {
    res.json("login");
})

app.get("/profile", (req, res) => {
    res.json("profile");
});


db.sequelize.sync().then(() => {
    app.listen(3003, () => {
        console.log("Server running on port 3003")
    });
});