function InstaPay() {
    var USDAmt = $('#transact_amount').text() * 10**18;
    var payTo = $('#transact_address').val();
    var TknAddr = ChangedTknAddr ? ChangedTknAddr : DAIRopsten;
    var SrcAmt = ChangedTknSrcAmt ? ChangedTknSrcAmt : USDAmt;
    if (TknAddr != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        var CoinContract = web3.eth.contract(tokensAbi).at(TknAddr);
        CoinContract.allowance(account, RopstenCP, function (err, res) {
            if (!err) {
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
        });
    } else {
        RunInstaPay(payTo, TknAddr, SrcAmt, USDAmt);
    }
}

function RunInstaPay(payTo, TknAddr, SrcAmt, USDAmt) {
    var CPInstaPay = web3.eth.contract(cryptoPayABI).at(RopstenCP);
    var payObj = {
        value: 0
    };
    if (TknAddr == "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        payObj.value = SrcAmt;
    }
    CPInstaPay.InstantPay(payTo, TknAddr, SrcAmt, USDAmt, payObj, function(err, res) {
        if (!err) {
            $("#payments_block").css('display','none');
            $("#payment_status").css('display','block');
            $('.transact_payment_status_title').html('Payment Successful');
            $('.transact_status_report span').removeClass('pe-7s-close text-danger');
            $('.transact_status_report span').addClass('pe-7s-check text-crypto');
            // alert('Your transaction has been sent to blockchain.');
        } else {
            alert(err);
        };
    });
}