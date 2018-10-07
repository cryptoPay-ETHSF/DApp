function ethBalance(user_add) {
    web3.eth.getBalance(user_add, function (err, res) {
        if (!err) {
            console.log(String(res));
            $('#getETHBal').text(`ETH : ${(String(res)/10**18).toFixed(3)}`);
        } else {
            console.error(err);
        };
    });
}

// coin_name in this format DAI, KNC, OMG
function daiBalance(user_add, coin_name) {
    if (checklist.networkId == "3") {
        var coin_add = kyberCoinAdd[coin_name].contractAddress;
    } else if (checklist.networkId == "42") {
        var coin_add = "0xc4375b7de8af5a38a93548eb8453a498222c4ff2";
    }
    var coinContract = web3.eth.contract(tokensAbi).at(coin_add);
    coinContract.balanceOf(user_add, function (err, res) {
        if (!err) {
            $('#getDaiBal').text(`DAI : ${(String(res)/10**18).toFixed(3)}`);
        } else {
            console.log(err);
        };
    });
}

ethBalance(account);
daiBalance(account, 'DAI');