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

/////////////////////////////////////////////////////////////////////////////////////////////////
//create password //////////////////////////////////////////////////////////////////////////////
function createPW(password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.error("Error in bcrypt.genSalt: " + err);
        }
        bcrypt.hash(createPW, salt, function (err, hash) {
            return hash;

        });
        //let person continue with creating account
        if (err) {
            console.error("Error in bcrypt.hash: " + err);
        }
        console.log("the hashed password is: " + hash);
    });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//verify password is good//////////////////////////////////////////////////////////////////////////////
function verifyNCreatePW(password) {
    var space = /\s/
    var required = /(?=.*\/d)(?=.*\/[a-z])(?=.*\/[A-Z]).*/
    //this should lead to the password does not have spaces in but does include lowercase, UPPERCASE, and 123 in any order
    if (password === verifyPassword) {
        if (required.search(password) !== -1 && space.search(password) == -1) {
            createPW(password);
        } else {
            return alert("Password does not meet requirements.\nPassword must not have spaces in it and must contain at least one of each of the following:\nnumer 1-0\nlower case letter a-z\ncapital letter A-Z");
        }
    } else {
        return alert("The passwords did not match");
    };
}

module.exports = verifyNCreatePW;
//////////////////////////////////////////////////////////////////////////////////////////////////////