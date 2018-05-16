$(document).ready(function(){
    $("#phone").inputmask("999-999-9999");  //static mask
    $("#phone").inputmask({"mask": "(999) 999-9999"}); //specifying options
  });



  $("#username").focusOut(function() {
    
    var username = $(this).text();         // Retrieves the text 

    $.get("/check/"+username, function(data) {
      if (data) {
        $("#usernameText").text("That username is taken.")
      }
      else {
        $("#usernameText").text("Username is available.")
      }
    }
    
});

$("#password").focusOut(function() {
    
  var password = $(this).text();         // Retrieves the text 

  //encrypt the password, then replace the form data with the hash
  
  // var hash = bcrypt.saltThatBadBoy(password);
  // $(#.password).text(hash);

});



$('.signup')
  .api({
    action: 'create user',
    beforeSend: function(settings) {
      // encrypt the password
      // 
    }
  })
;