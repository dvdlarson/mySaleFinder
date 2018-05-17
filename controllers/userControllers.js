//used https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
// as a source

var bcrypt = requires("bcrypt");
var User = requires("../models/users");
var Credentials = requires("../credentials/");

//user log in
app.get('/login', sessionChecker, (req, res) => {
        res.render("login", {style: "login"});
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({
            where: {
                username: username
            }
        }).then(function (user, password) {
            //might need to remove the passsword from this function
            if (!user) {
                res.render("login", {style: "login"});
            } else if (!User.checkPW(password, user.hash)) {
                res.render("login", {style: "login"});
            } else {
                req.session.user = user.dataValues;
                res.render("manage", {style: "manage"});
            }
        });
    });
    //in the .then function, added password, added hash to the else if line
    //checkPW compares 2 passwords, need to make sure I am properly calling them
    //console.logs will be our friends.

//create account
app.get('/signup', sessionChecker, (req, res) => {
        res.render("signup", {style: "signup"});
        console.log(sessionChecker, res);
    })
    .post((req, res) => {
        var hash = Credentials.verifyNCreatePW(req.param.password, req.param.verifyPW);
        console.log(hash);
        User.User.create({
                username: req.param.username,
                email: req.param.email,
                phone: req.param.phone,
                first_name: req.param.firstName,
                last_name: req.param.lastName,
                city: req.param.city,
                state: req.param.state,
                zip_cd: req.param.zip,
                password: hash

                //need to add all the information from signup page here
            })
            .then(user => {
                console.log(user.username);
                req.session.user = user.dataValues;
                res.render("manage", {style: "manage"});
            })
            .catch(error => {
                console.error(error);
                res.redirect('/signup');
            });
    });

//logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});