$(document).ready(function () {


    $(".login").on("click", function (event) {
        event.preventDefault();
        var user = {
            username: $(".username").val().trim(),
            password: $(".password").val().trim(),
        };
        console.log(user);

        // $.get("/api/users").then(function (data) {
        //     console.log("data: " + data);
        //     // if (user.password = data.password) {
        //     //     console.log("hazzah");
        //     // } else {
        //     //     console.log(user.password, data.password);
        //     //     console.log(data);
        //     // }
        // });
        getUsers(user);
    });

    function getUsers(user) {
        $.ajax("/api/users", {
            type: "GET",
            data: user
        }, function (data) {
            console.log("data: " + data);
        });
    }
    //getUsers();
});