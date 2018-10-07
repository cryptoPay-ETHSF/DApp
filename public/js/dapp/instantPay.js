function InstaPay() {
    var USDAmt = $('#transact_amount').text() * 10**18;
    var payTo = $('#transact_address').val();
    var TknAddr = ChangedTknAddr ? ChangedTknAddr : DAIRopsten;
    var CoinContract = web3.eth.contract(tokensAbi).at(TknAddr);
    CoinContract.allowance(account, RopstenCP, function (err, res) {
        if (!err) {
            var SrcAmt = ChangedTknSrcAmt ? ChangedTknSrcAmt : USDAmt;
            console.log(String(res), SrcAmt);
            if (String(res) < SrcAmt) {
                console.log(2);
                // var payObj = {
                //     value: 0
                // }
                CoinContract.approve(RopstenCP, 2**255, function(err, res) {
                    if (!err) {
                        RunInstaPay(
                            payTo,
                            TknAddr,
                            SrcAmt,
                            USDAmt
                        );
                    } else {
                        alert(err);
                        console.log(err);
                    };
                });
            } else {
                RunInstaPay(
                    payTo,
                    TknAddr,
                    SrcAmt,
                    USDAmt
                );
            }
        } else {
            alert(err);
            console.log(err);
        };
    })
}

function RunInstaPay(payTo, TknAddr, SrcAmt, USDAmt) {
    var CPInstaPay = web3.eth.contract(cryptoPayABI).at(RopstenCP);
    CPInstaPay.InstantPay(payTo, TknAddr, SrcAmt, USDAmt, function(err, res) {
        if (!err) {
            alert('Your transaction has been sent to blockchain.');
        } else {
            alert(err);
        };
    });
}