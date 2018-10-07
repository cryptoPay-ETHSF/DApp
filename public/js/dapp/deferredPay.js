function DeferredPay() {
    var USDAmt = $('#transact_amount').text();
    var payTo = $('#transact_address').val();
    var LockETH = USDAmt * 2 / 250;
    var SrcAmt = USDAmt * (10**18);
    // console.log(LockETH, SrcAmt);
    var CPDeferPay = web3.eth.contract(cryptoPayABI).at(KovanCP);
    var payObj = {
        value: LockETH * (10**18),
        gasPrice: 655315
    };
    // console.log(payTo, SrcAmt, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0);
    CPDeferPay.DeferredPay(payTo, SrcAmt, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0, payObj, function(err, res) {
        if (!err) {
            var rURL = `https://kovan.etherscan.io/tx/${res}`;
            $('.check_trx').html(`<a href="${rURL}" target="_blank" style="color:white;text-decoration:none;">Check Txn Status</a>`);
            $("#payments_block").css('display','none');
            $("#payment_status").css('display','block');
            $('.transact_payment_status_title').html('Tx sent to Blockchain');
            $('.transact_status_report span').removeClass('pe-7s-close text-danger');
            $('.transact_status_report span').addClass('pe-7s-check text-crypto');
            // alert('Your transaction has been sent to blockchain.');
        } else {
            alert(err);
        };
    });
}