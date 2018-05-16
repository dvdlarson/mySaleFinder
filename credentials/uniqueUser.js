//verify unique user_name/////////////////////////////////////////////////////////////////////////////
function uniqueUser(dbUser, userInput) {
    if (dbUser === null) {
        return userInput;
    } else {
        return alert("That name is already taken");
    }

    // for (var i = 0; i < dbUser.length; i++) {
//     if (userInput === dbUser[i].user_id) {
//         return alert("That name is already taken");
//     }
// }

// return userInput;
// }

module.exports = uniqueUser;
}
/*
Will use the following controller, need to add to controllers:
var pw = require("../credentials");
    app.get("/api/users", function (req, res) {
        User.findOne({
            where: {
                user_id: req.body.user_id
              }
        }).then(function (users) {
            pw.uniqueUser(users, req.body.user_id);
            pw.verifyNCreatePW(req.body.password)
        }).then(app.post("/api/users", function(req, res) {
            user.create({
                user_id: req.body.user_id, 
                hash: hash
            }), function(dbUser){
                res.json(dbUser)
            });
        }));

        */