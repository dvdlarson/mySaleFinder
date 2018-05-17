var Nightmare = require("nightmare");
//var expect = require("chai").expect;
var nightmare = Nightmare({show: true});

nightmare
//.waitTimeout(10000)
.goto("http://localhost:8080/signup")
.type("#username", "Chay")
.type("#password", "Pw1")
.type("#verifyPassword", "Pw1")
.type("#firstName", "Chay")
.type("#lastName", "Dahill")
.type("#email", "fake@fake.com")
.type("#phone", "5555555555")
.type("#city", "Phoenix")
.click("#state")
//.mousedown(3)
.click("#state")
.type("#zip", "85224")
.click(".submit")
.end()
.catch(function(err){
    console.error("Error: " + err);
})