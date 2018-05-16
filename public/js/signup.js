$(document).ready(function(){
    $("#phone").inputmask("999-999-9999");  //static mask
    $("#phone").inputmask({"mask": "(999) 999-9999"}); //specifying options
  });