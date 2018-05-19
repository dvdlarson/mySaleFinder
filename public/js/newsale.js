$('.addsale').on("click", function (event) {
    event.preventDefault();
    var newSale = {
      title: $("#username").val().trim(),
      email: email,
      phone: phone,
      first_name: firstName,
      last_name: lastName,
      city: city,
      state: state,
      zip_cd: zip,
      password: $("#password").val().trim()
    }
    $.post("/api/sale", newSale)
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