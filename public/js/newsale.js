$(document).ready(function () {
    // $('#example1').calendar();


    $('.ui.radio.checkbox')
        .checkbox();
    $('select.dropdown')
        .dropdown();

    //add a burger
    $(".addsale").on("click", function (event) {
        event.preventDefault();
        console.log($("#rangeend").val() + "testing something");
        var fullAddress = $("#address").val().trim() + " " + $("#city").val().trim() + " " + $("#state").val().trim() + " " + $("#zip").val().trim()
        console.log("full addr: " + fullAddress);


        var newSale = {
            title: $("#title").val().trim(),
            sale_type: $("#sale_type").val().trim(),
            start_date: $("#rangestart").val(),
            end_date: $("#rangeend").val(),
            start_time: $("#starttime").val(),
            end_time: $("#endtime").val(),
            on_street_parking: $("#parking").val().trim(),
            inside_outside: $("#inside_outside").val().trim(),
            weather_cancel: $("#weather_cancel").val().trim(),
            items_desc: $("#desc").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip_cd: $("#zip").val().trim(),
            full_address: fullAddress,
            active: 1,
            // UserId: req.session.user.id

        };
        console.log(newSale);

        $.ajax("/api/addsale", {
            type: "POST",
            data: newSale
        }).then(function () {
            console.log("Added new sale: " + newSale);
            location.href = "/manage";
        });
    });


});
