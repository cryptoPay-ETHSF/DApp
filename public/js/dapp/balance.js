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

// coin_name in this format DAI, KNC, OMG
function balanceOf(user_add, coin_name) {
    var coinContract = web3.eth.contract(tokensAbi).at(coin_add);
    coinContract.balanceOf(user_add, function (err, res) {
        if (!err) {
            return(String(res), kyberCoinAdd[coin_name].decimals);
        } else {
            console.log(err);
        };
    });
}