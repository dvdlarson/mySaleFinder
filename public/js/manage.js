//javascript for the manage page goes here

$(function () {
    $(".edit").click(function (event) {
        var item = $(this).closest("tr") // Finds the closest row <tr> 
            .find(".id") // Gets a descendent with class="id"
            .text(); // Retrieves the text within <td>
        console.log("You pressed a button!" + item);
        var url = "/edit/" + item;
        console.log(url);
        location.href = url;
        //$(location).attr('href', url)      // Routes to the edit page
    });

    $(".delete").click(function (event) {
        event.preventDefault();
        var item = $(this).closest("tr") // Finds the closest row <tr> 
            .find(".id") // Gets a descendent with class="id"
            .text(); // Retrieves the text within <td>        console.log("devoured button " + id + " clicked");
        var deleted = {
            active: false
        };
        var confirmDelete = confirm("This can not be un-done. Continue?");
        if (confirmDelete == false) {
            return;
        } else {

        $.ajax("/api/delete/" + item, {
            type: "PUT",
            data: deleted
        }).then(function () {
            location.reload();
        });
    }});
});

$(document).ready(function() {
    if ($("td").length === 0) {
        console.log("no sales");
        $("table").after("<div id='nosales'><h1 >No sales! :(</h1></div>")
    }
    $(document).on("click", ".addsale", function() {
        window.location = "/sale"
    })
 });
