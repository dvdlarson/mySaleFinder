//javascript for the manage page goes here


$(".edit").click(function() {
    var $item = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find(".id")     // Gets a descendent with class="id"
                       .text();         // Retrieves the text within <td>

    var url="/api/"+$item+"?edit"; 
    $(location).attr('href', url)      // Routes to the edit page
});


$(".delete").click(function() {
    var confirmDelete=confirm("This can not be un-done. Continue?");
    if (confirmDelete==false){
        return;
    }
    var $item = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find(".id")     // Gets a descendent with class="id"
                       .text();         // Retrieves the text within <td>

    var url="/api/edit/"+$item; 
    $(location).attr('href', url)      // Routes to the edit page
});