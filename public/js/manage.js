//javascript for the manage page goes here

$(function () {
    $(".edit").click(function (event) {
        var item = $(this).closest("tr") // Finds the closest row <tr> 
            .find(".id") // Gets a descendent with class="id"
            .text(); // Retrieves the text within <td>
        console.log("You pressed a button!" + item);
        var url = "/sale/" + item;
        console.log(url);
        location.href = url;
        //$(location).attr('href', url)      // Routes to the edit page
    });


    $(".delete").click(function () {
        var confirmDelete = confirm("This can not be un-done. Continue?");
        if (confirmDelete == false) {
            return;
        }
        var $item = $(this).closest("tr") // Finds the closest row <tr> 
            .find(".id") // Gets a descendent with class="id"
            .text(); // Retrieves the text within <td>

        var url = "/api/edit/" + $item;
        $(location).attr('href', url) // Routes to the edit page
    });
});