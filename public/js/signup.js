$(document).ready(function () {
  $("#phone").inputmask("999-999-9999"); //static mask
  $("#phone").inputmask({
    "mask": "(999) 999-9999"
  }); //specifying options
});



$("#username").focusout(function () {

  var username = $(this).text(); // Retrieves the text 

  $.get("/check/" + username, function (data) {
    if (data) {
      $("#usernameText").text("That username is taken.")
    } else {
      $("#usernameText").text("Username is available.")
    }
  })
});

$("#password").focusout(function () {

  var password = $(this).text(); // Retrieves the text 

  // update the password status

  //$("#.passwordtext").text("Securing Password.");


  //encrypt the password

  // var hash = bcrypt.saltThatBadBoy(password);

  //wait two seconds then update the status

  // passwordWait(2000);  

  //replace the form data with the hashed value

  // $("#.password").text(hash);
  //

});



$('.signup').on("click", function (event) {
  event.preventDefault();
  var newUser = {
    username: $("#username").val().trim(),
    email: email,
    phone: phone,
    first_name: firstName,
    last_name: lastName,
    city: city,
    state: state,
    zip_cd: zip,
    password: $("#password").val().trim()
  }
  $.post("/api/user", newUser)
    // type: 'POST',
    // data: newUser,
    //action: 'create user',
    //beforeSend: function(settings) {
    // encrypt the password
    // 
    //}
  .then(function () {
    console.log(newUser);
  });
});
function consoleLog(newUser) {
  console.log(newUser);
}
function passwordWait(ms) {
  setTimeout(function (ms) {
    $("#.passwordtext").text("Password secured.");
  }, ms)
}