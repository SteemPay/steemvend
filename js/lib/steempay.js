/*jslint browser: true*/
/*global $, console, XMLHttpRequest, window, navigation, setTimeout*/

var steempay = {
    randMemo: function () {
        var text = "",
            possible = "abcdefghijkmnopqrstuvwxyz023456789", //remove 1 and L...look too much alike?
            length = 7;
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    vend: function () {
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
    },
    isActive: true,
    startPolling: function (account, amount, memo) {
        if (steempay.isActive) {
            console.log("looking for transaction...");
            window.setTimeout(function () {
                $.ajax({
                    url: "https://api.steemjs.com/get_account_history?account=" + account + "&from=-1&limit=100",
                    type: "GET",
                    success: function (result) {
                        //SUCCESS LOGIC
                        var log = result.reverse();

                        log.forEach(function (element) {
                            if (element[1].op[0] === "transfer" &&
                                parseFloat(element[1].op[1].amount) >= parseFloat(amount) &&
                                element[1].op[1].memo === memo) {
                                console.log("transaction found");
                                console.log(element);
                                steempay.vend();
                                navigation.showPage("#confirm");
                                setTimeout(function () {
                                    navigation.showPage("#home");
                                }, 10000);
                                steempay.isActive = false;
                            }
                        });

                        steempay.startPolling(account, amount, memo);
                    },
                    error: function () {
                        //ERROR HANDLING
                        console.log("error");
                        steempay.startPolling(account, amount, memo);
                    }
                });
            }, 2500);
        } else {
            console.log("stopped looking...");
        }
    },
    stopPolling: function () {
        steempay.isActive = false;
    }
};