//this is part of creating a user so won't be able to get any information
//check user inputted username to those already in database
//if unique, continue
//else inform user that the name is already taken

//make sure first time typing pw and second time are the same
//if so, continue
//else prompt user that both pws need to be the same
//create password, should pretty much be the code from password.js
//in it, use regex to make sure there are no spaces and that it meets all password requirements
//if so, create and push password
//else prompt for a different password

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
///////////////////////////////////////////////////////////////////////////////////////////
//Part of post.js models /////////////////////////////////////////////////////////////////
var User = sequelize.define("users", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
///////////////////////////////////////////////////////////////////////////////////////////
//Part of api-routes.js //////////////////////////////////////////////////////////////////
function routes(app) {
    app.get("/api/users", function (req, res) {
        User.findall().then(function (dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/users/:id", function (req, res) {
        User.create({
            user_id: req.body.user_id,
            password: req.body.password //need to replace with hash password from createPW function
        });
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////
//create password //////////////////////////////////////////////////////////////////////////////
function createPW(password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error("Error in bcrypt.genSalt: " + err);
        }
        bcrypt.hash(createPW, salt, function (err, hash) {
            app.post("/api/users/:id", function (req, res) {
                User.create({
                    hash: hash
                });
            });
            //let person continue with creating account
            if (err) {
                console.error("Error in bcrypt.hash: " + err);
            }
            console.log("the hashed password is: " + hash);
        });
    });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
//verify password is good//////////////////////////////////////////////////////////////////////////////
//Need to change password and verifypassword to call in user input
var space = /\s/
var required = /(?=.*\/d)(?=.*\/[a-z])(?=.*\/[A-Z]).*/
if (password === verifyPassword) {
    if (required.search(password) !== -1 && space.search(password) == -1) {
        createPW(password);
    } else {
        alert("Password does not meet requirements.\nPassword can only contain letters and numbers and must contain at least one of each of the following:\nnumer 1-0\nlower case letter a-z\ncapital letter A-Z");
    }
} else {
    alert("The passwords did not match");
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
//verify unique user_name/////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < dbUser.length; i++) {
    if (user_id === dbUser[i].user_id) {
        alert("That name is already taken");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////