//import { builtinModules } from "module";

//require user name and password
//use checkPW function from passwor.js
//need to make a few changes:
//check that the typed user name and password match the same row in mysql
//if so, go to next screen
//else, prompt user to try again

function checkPW(testPW, hash) {
    bcrypt.compare(testPW, hash).then(function (res) {
        console.log("User input: " + testPW + ".  The hash on record is: " + hash);
        console.log("Are the 2 passwords the same?  " + res);
        //true is a correct PW
        return res;
        //create a controller that if res is true then advance to the next page

    });
}

module.exports = checkPW;