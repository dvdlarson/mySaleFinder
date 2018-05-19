$(document).ready(function () {

    //add a burger
    $(".addsale").on("click", function (event) {
        event.preventDefault();
        var fullAddress=$("#address").val().trim()+" "+$("#city").val().trim()+" "+$("#state").val().trim()+" "+$("#zip").val().trim()



        var newSale = {
            title: $("#username").val().trim(),
            sale_type: $("#sale_type").val().trim(),
            start_date: $("#rangestart").val().trim(),
            end_date: $("#rangeend").val().trim(),
            start_time: $("#startTime").val().trim(),
            end_time:$("#endTime").val().trim(),
            on_street_parking:$("#parking").data(value),
            inside_outside:$("#inside_outside").data(value),
            weather_cancel:$("#weather_cancel").data(value),
            items_desc:$("#desc").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip_cd: $("#zip").val().trim(),
            full_address:fullAddress,
            password: $("#password").val().trim(),
            active:1,
            UserId:1

        };
        console.log(newSale);

        $.ajax("/api/addsale", {
            type: "POST",
            data: newSale
        }).then(function () {
            console.log("Added new sale: " + newSale);
        });
    });
});
