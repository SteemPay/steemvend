//set steem api server
steem.api.setOptions({
    url: 'https://api.steemit.com'
});

//account and price
var config = {
    account: "kodaxx",
    price: "0.001 SBD",
    brand: "Pepsi Vending Machine"
};

$( document ).ready(function() {
    $(".account").text("@" + config.account);
    $(".price").text(config.price);
});