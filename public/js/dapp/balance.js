function ethBalance(user_add) {
    web3.eth.getBalance(user_add, function (err, res) {
        if (!err) {
            var arr = [String(res), 18];
            return(arr);
        } else {
            console.error(err);
        };
    });
}

coinTwoContract = web3.eth.contract(tokensAbi).at(coinTwoAdd);
coinTwoContract.balanceOf(account, function (err, res) {
    if (!err) {
        coinTwoQtyInWei = String(res);
        coinTwoQty = coinTwoQtyInWei;
        for (var i = 0; i < coinTwoDecimal; i++) {
            coinTwoQty = coinTwoQty / 10;
        }
        onBuyClick();
    } else {
        var title = 'ERROR GETTING QUANTITY';
        var content = `Unable to get quantity of ${coinTwoName} in your wallet`;
        showAlert(title, content);
        console.log(err);
    };
});