$(document).ready(function () {


    $(".login").on("click", function (event) {
        event.preventDefault();
        var user = {
            username: $(".username").val().trim(),
            password: $(".password").val().trim(),
        };
        console.log(user);

        getUsers(user);
    });

    function getUsers(user) {
        $.ajax("/api/users", {
            type: "GET",
            data: user
        }).then(function (data) {
            console.log("data: " + data);
            location.href = "/manage";
        });
        //getUsers();
    };
});

// function nextPage() {
//     $.ajax("/manage", {
//         type: "PUT"
//   //      data: 
//     });
// }