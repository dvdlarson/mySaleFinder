//used https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
// as a source

var bcrypt = require("bcrypt");
var User = require("../models/users");
//var Create = require("../credentials/createPW");
var Login = require("../credentials/login");
var Unique = require("../credentials/uniqueUser")

module.exports = function (app) {
    // var sessionChecker = (req, res, next) => {
    //     if (req.session.user && req.cookies.user_sid) {
    //         res.redirect('/manage');
    //     } else {
    //         next();
    //     }
    // };
    //user log in
    // app.get('/login', sessionChecker, (req, res) => {
    //         res.render("login", {
    //             style: "login"
    //         });
    //     })
    //     .post((req, res) => {
    //         var username = req.body.username,
    //             password = req.body.password;

    //         User.findOne({
    //             where: {
    //                 username: username
    //             }
    //         }).then(function (user, password) {
    //             //might need to remove the passsword from this function
    //             if (!user) {
    //                 res.render("login", {
    //                     style: "login"
    //                 });
    //             } else if (!User.checkPW(password, user.hash)) {
    //                 res.render("login", {
    //                     style: "login"
    //                 });
    //             } else {
    //                 req.session.user = user.dataValues;
    //                 res.render("manage", {
    //                     style: "manage"
    //                 });
    //             }
    //         });
    //     });
    //in the .then function, added password, added hash to the else if line
    //checkPW compares 2 passwords, need to make sure I am properly calling them
    //console.logs will be our friends.

    //create account
    // app.get('/signup', sessionChecker, (req, res) => {
    //     res.render("signup", {
    //         style: "signup"
    //     });
        //console.log("sessionChecker, res");
    //});
    // var hash;
    // app.post('/api/users', (req, res) => {
    //     var password = req.body.password
    //     console.log("password: " + req.body.password);

    //     function hashSalt(password) {
    //         saltRounds = 10;
    //         bcrypt.genSalt(saltRounds, function (err, salt) {
    //             console.log("salt: " + salt);
    //             if (err) {
    //                 console.error("Error in bcrypt.genSalt: " + err);
    //             }
    //             bcrypt.hash(password, salt, function (err, saltyHash) {
    //                 hash = saltyHash;
    //                 console.log("bcrypt.hash");

    //                 //let person continue with creating account
    //                 if (err) {
    //                     console.error("Error in bcrypt.hash: " + err);
    //                 }
    //                 console.log("the hashed password is: " + hash);
    //                 //return hash;
    //                 return hash;
    //             });
    //         });
    //     }
    //     hashSalt(password);
    //     console.log("line 73: " + hash);
    //     console.log("User.users: " + User.users);
    //     User.User.create({
    //             username: req.body.username,
    //             email: req.body.email,
    //             phone: req.body.phone,
    //             first_name: req.body.firstName,
    //             last_name: req.body.lastName,
    //             city: req.body.city,
    //             state: req.body.state,
    //             zip_cd: req.body.zip,
    //             password: hash

    //             //need to add all the information from signup page here
    //         })
    //         .then(user => {
    //             console.log(user.username);
    //             req.session.user = user.dataValues;
    //             res.render("manage", {
    //                 style: "manage"
    //             });
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             res.redirect('/signup');
    //         });
    // });

    //logout
//     app.get('/logout', (req, res) => {
//         if (req.session.user && req.cookies.user_sid) {
//             res.clearCookie('user_sid');
//             res.redirect('/');
//         } else {
//             res.redirect('/login');
//         }
//     });
}