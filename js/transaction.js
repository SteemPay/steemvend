/*jslint browser: true*/
/*global $, console, config, XMLHHTPRequest, isActive, startPolling*/

$.ajaxSetup({
    async: false
});

//trigger vend script
function vend() {
    var v = new XMLHttpRequest();
    v.open('GET', 'vend.php');
    v.onreadystatechange = function () {
        if (v.readyState === 4) {
            if (v.status === 200) {
                console.log("vend success");
            } else {
                console.log("vend error");
            }
        }
    };
    v.send();
}

//generate random memo
function randMemo() {
    var text = "",
        possible = "abcdefghijklmnopqrstuvwxyz0123456789",
        length = 7;

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function transaction() {
    isActive = true;
    var account = config.account,
        price = encodeURI(config.price),
        memo = randMemo();
    
    $(".memo").text(memo);

    console.log("-----------------------------------");
    console.log("To Account: " + account);
    console.log("Amount: " + decodeURI(price));
    console.log("Memo: " + memo);
    console.log("-----------------------------------");

    startPolling(account, price, memo, vend);
}