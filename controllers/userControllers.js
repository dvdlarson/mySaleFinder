//used https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
// as a source

//user log in
var bcrypt = requires("bcrypt");
var User = requires("../models/users");
var Credentials = requires("../credentials/");


app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render("login", {style: "index"});
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({
            where: {
                user_id: username
            }
        }).then(function (user, password) {
            if (!user) {
                res.render("login", {style: "index"});
            } else if (!User.checkPW(password, hash)) {
                res.render("login", {style: "index"});
            } else {
                req.session.user = user.dataValues;
                res.render("manage", {style: "index"});
            }
        });
    });
    //in the .then function, added password, added hash to the else if line
    //checkPW compares 2 passwords, need to make sure I am properly calling them
    //console.logs will be our friends.

//create account
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render("signup", {style: "index"});
    })
    .post((req, res) => {
        var hash = Credentials.verifyNCreatePW(req.body.password);
        User.create({
                username: req.body.username,
                email: req.body.email,
                hash: hash
                //need to add all the information from signup page here
            })
            .then(user => {
                req.session.user = user.dataValues;
                res.render("manage", {style: "index"});
            })
            .catch(error => {
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