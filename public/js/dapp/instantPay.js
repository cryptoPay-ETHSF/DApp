function InstaPay() {
    var TknAddr = ChangedTknAddr ? ChangedTknAddr : DAIRopsten;
    var CoinContract = web3.eth.contract(tokensAbi).at(TknAddr);
    CoinContract.allowance(account, RopstenCP, function (err, res) {
        if (!err) {
            var SrcAmt = ChangedTknSrcAmt ? ChangedTknSrcAmt : $('#transact_amount').text() * 10**18;
            console.log(String(res), SrcAmt);
            if (String(res) < SrcAmt) {
                console.log(2);
                // var payObj = {
                //     value: 0
                // }
                CoinContract.approve(RopstenCP, 2**255, function(err, res) {
                    if (!err) {
                        // trade(ChangedTknAddr, ChangedTknSrcAmt, DAIRopsten, account, (2**255), 0);
                    } else {
                        alert(err);
                        console.log(err);
                    };
                })
            } else {
                console.log(3);
                // trade(src, ChangedTknSrcAmt, DAIRopsten, account, (2**255), 0);
            }
        } else {
            alert(err);
            console.log(err);
        };
    })
}