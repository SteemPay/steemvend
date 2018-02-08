var isActive = true;

function startPolling(account, amount, memo, cb) {

    if (isActive) {
        console.log("checking for transaction...");
        window.setTimeout(function () {
            $.ajax({
                url: "https://api.steemjs.com/get_account_history?account=" + account + "&from=-1&limit=10000",
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
                            cb();
                            showPage("#confirm");
                            setTimeout(function () {
                                showPage("#home");
                            }, 10000);
                            isActive = false;
                        }
                    });

                    startPolling(account, amount, memo, cb);
                },
                error: function () {
                    //ERROR HANDLING
                    console.log("error");
                    startPolling(account, amount, memo, cb);
                }
            });
        }, 2500);
    } else {
        console.log("stopped polling...");
    }
}

function stopPolling() {
    isActive = false;
}