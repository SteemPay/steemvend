/*jslint browser: true*/
/*global $, transaction, stopPolling, navigator, window, document*/

//function to hide/show pages in our spa
function showPage(page) {
    if (!$(page).hasClass("hidden")) {
        return true;
    }
    $(".hideable").addClass("hidden");
    $(page).removeClass("hidden");
}

//if device does not have internet access, show connection page
if (!navigator.onLine) {
    showPage("#connection");
}
//if device goes offline, show connection page
window.addEventListener('offline', function () {
    showPage("#connection");
});
//if device comes online, show connection page
window.addEventListener('online', function () {
    showPage("#home");
});

//attach functions to buttons
$(document).ready(function () {
    $('#purchase').click(function () {
        transaction();
        showPage('#sale');
    });

    $('#cancel').click(function () {
        stopPolling();
        showPage("#home");
    });
});