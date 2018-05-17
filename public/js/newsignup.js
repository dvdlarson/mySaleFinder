$(document).ready(function () {

    //add a burger
    $(".signup").on("click", function (event) {
        event.preventDefault();
        var newUser = {
        username: $("#username").val().trim(),
        email: $("#email").val().trim(),
        phone: $("#phone").val().trim(),
        first_name: $("#firstName").val().trim(),
        last_name: $("#lastName").val().trim(),
        city: $("#city").val().trim(),
        state: $("#state").val().trim(),
        zip_cd: $("#zip").val().trim(),
        password: $("#password").val().trim(),

        };
        console.log(newUser);

        $.ajax("/api/users", {
            type: "POST",
            data: newUser
        }).then(function () {
            console.log("Added new burger: " + newUser);
        });
    });
});
