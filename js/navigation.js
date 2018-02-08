function showPage(page) {
    if ($(page).hasClass("hidden") !== true) {
        return true;
    }
    $(".hideable").addClass("hidden");
    $(page).removeClass("hidden");
}

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