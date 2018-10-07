// // parameters in this form ETH, DAI, KNC
// function expectedRateCoinToCoin(coinOneName, coinTwoName) {
//     var coinOneDecimal = kyberCoinAdd[coinOneName].decimals;
//     var oneNum = 10 ** coinOneDecimal;
//     mainKyberContract.getExpectedRate(kyberCoinAdd[coinOneName].contractAddress, kyberCoinAdd[coinTwoName].contractAddress, oneNum, function (err, res) {
//         if (!err) {
//             var arr = [String(res[0]), kyberCoinAdd[coinTwoName].decimals];
//             console.log(arr);
//             return(arr);
//         } else {
//             console.log(err);
//         };
//     });
// }