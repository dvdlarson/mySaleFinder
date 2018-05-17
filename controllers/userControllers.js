//used https://www.codementor.io/emjay/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
// as a source

var bcrypt = requires("bcrypt");
var User = requires("../models/users");
var Credentials = requires("../credentials/");

//user log in
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render("login", {style: "login"});
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({
            where: {
                user_id: username
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
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render("signup", {style: "signup"});
    })
    .post((req, res) => {
        var hash = Credentials.verifyNCreatePW(req.body.password, req.body.verifyPW);
        User.create({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                city: req.body.city,
                state: req.body.state,
                zip_cd: req.body.zip,
                password: hash

                //need to add all the information from signup page here
            })
            .then(user => {
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