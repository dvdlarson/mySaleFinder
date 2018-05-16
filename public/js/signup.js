$(document).ready(function(){
    $("#username").inputmask("99-9999999");  //static mask
    $("#username").inputmask({"mask": "(999) 999-9999"}); //specifying options
    $("#username").inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax
  });