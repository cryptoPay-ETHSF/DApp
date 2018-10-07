// parameters in this form ETH, DAI, KNC
function funcToSelect(coinOneName) {
    console.log(coinOneName);
    var coinTwoName = "DAI";
    var coinOneDecimal = kyberCoinAdd[coinOneName].decimals;
    var oneNum = 10 ** coinOneDecimal;
    var USDAmt = $('#transact_amount').text();
    console.log(kyberCoinAdd[coinOneName].contractAddress, kyberCoinAdd[coinTwoName].contractAddress, oneNum);
    mainKyberContract.getExpectedRate(kyberCoinAdd[coinTwoName].contractAddress, kyberCoinAdd[coinOneName].contractAddress, oneNum, function (err, res) {
        if (!err) {
            var rateVal = String(res[0]);
            var tknDecimals = kyberCoinAdd[coinTwoName].decimals;
            var valueToPopulate = rateVal / 10**tknDecimals * USDAmt;
            console.log(valueToPopulate);
            $('#transact_value').val(`${valueToPopulate.toFixed(2)} ${coinOneName}`);
        } else {
            console.log(err);
        };
    });
}