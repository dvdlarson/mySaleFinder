$(document).ready(function () {

    //add a burger
    $(".signup").on("click", function (event) {
        event.preventDefault();
        var newUser = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim()
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
