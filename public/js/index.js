$(document).ready(function () {
    // Dim the left and right panels
    $('.dimmer').dimmer('show');
    // Hover event for left panel TODO: COMBINE THESE LATER
    $('#left-panel').hover(function () {
        $("#left-panel h2").stop(true);
        $("#left-panel h2").animate({
            zoom: 1.2
        });
    }, function () {
        $("#left-panel h2").stop(true);
        $("#left-panel h2").animate({
            zoom: 1
        });
    })
    // Hover event for right panel TODO: COMBINE THESE LATER
    $('#right-panel').hover(function () {
        $("#right-panel h2").stop(true);
        $("#right-panel h2").animate({
            zoom: 1.2
        });
    }, function () {
        $("#right-panel h2").stop(true);
        $("#right-panel h2").animate({
            zoom: 1
        });
    });
});