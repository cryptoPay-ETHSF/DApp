// parameters in this form ETH, DAI, KNC
var ChangedTknAddr;
var ChangedTknSrcAmt;
function funcToSelect(coinOneName) {
    console.log(coinOneName);
    var coinTwoName = "DAI";
    var coinOneDecimal = kyberCoinAdd[coinOneName].decimals;
    var oneNum = 10 ** coinOneDecimal;
    var USDAmt = $('#transact_amount').text();
    ChangedTknAddr = kyberCoinAdd[coinOneName].contractAddress;
    mainKyberContract.getExpectedRate(kyberCoinAdd[coinTwoName].contractAddress, ChangedTknAddr, oneNum, function (err, res) {
        if (!err) {
            var rateVal = String(res[0]);
            var tknDecimals = kyberCoinAdd[coinTwoName].decimals;
            var valueToPopulate = rateVal / 10**tknDecimals * USDAmt;
            console.log(valueToPopulate);
            ChangedTknSrcAmt = rateVal * USDAmt;
            $('#transact_value').val(`${valueToPopulate.toFixed(2)} ${coinOneName}`);
            $('#transact_value').attr('', '');
        } else {
            console.log(err);
        };
    });
}