$(document).ready(function () {
    var originalPath;

    $(".login").on("click", function (event) {
        event.preventDefault();
        getPath();
        console.log("oP: " + originalPath)
        var user = {
            username: $(".username").val().trim(),
            password: $(".password").val().trim(),
        };
        getUsers(user);
    });

    function getPath() {
        $.ajax("/origpath", {
            type: "GET",
            data: originalPath
        });
    }

    function getUsers(user) {
        $.ajax("/api/users", {
            type: "GET",
            data: user
        }).then(function (data) {
            location.href = originalPath;
            console.log(originalPath)
        });
        //getUsers();
    };
});