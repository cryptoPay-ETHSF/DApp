var mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
var mainKyberContract = web3.eth.contract(kyberMainABI).at(mainKyberAdd);


// parameters in this form ETH, DAI, KNC
function expectedRateCoinToCoin(coinOneName, coinTwoName) {
    var coinOneDecimal = kyberCoinAdd[coinOneName].decimals;
    var oneNum = 10 ** coinOneDecimal;
    mainKyberContract.getExpectedRate(kyberCoinAdd[coinOneName].contractAddress, kyberCoinAdd[coinTwoName].contractAddress, oneNum, function (err, res) {
        if (!err) {
            var arr = [String(res[0]), kyberCoinAdd[coinTwoName].decimals];
            return(arr);
        } else {
            console.log(err);
        };
    });
}