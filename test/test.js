//this test was written for a stand alone code for bcrypt that was then implemented into yardpicker
//this code will not work with the current files in the repository

var pw = require ("../password.js");
var expect = require("chai").expect;
describe("create password", function(){
    // it("should return a string", function(){
    //     expect(pw.makePW(password)).to.be.a('string');
    // });
    // it("should return a different string than password", function(){
    //     expect(pw.makePW(password)).to.not.equal(password);
    
    it("should accept the password", function(){
        expect(pw.makePW("ABC123abc!@#", function(hash){
            pw.checkPW("ABC123abc!@#", hash)})).to.be(true);
    });
    it("should not accept the password", function(){
        expect(pw.makePW("ABC123abc!@#", function(hash){
            pw.checkPW("AB23abc!@#", hash)})).to.equal(false);
    });
});