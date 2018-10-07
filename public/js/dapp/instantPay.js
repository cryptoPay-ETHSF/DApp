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

var link_id;
var dataObj = {};
var count = {};
var paymentOwner;
function getQueryParams() {
    let querystring = window.location.search.substring(1);
    let divide = querystring.split('&');
    for (var i = 0; i < divide.length; i++) {
        let keyValPair = divide[i].split('=');
        dataObj[keyValPair[0]] = keyValPair[1];
    }
    link_id = dataObj.id;
    console.log(link_id);
    var payTo = $('#transact_address').val();
    console.log(payTo);
    db.ref(`links`).on('value', function(snap) {
        var data = snap.val();
        console.log(data);
        Object.keys(data)
        .forEach(function (key, i) {
            Object.keys(data[key])
            .forEach(function (links, i) {
                if (links == link_id) {
                    count.price = data[key][links].price;
                    count.dai_received = data[key][links].DAI_collected;
                    count.no_of_transactions = data[key][links].total_transaction;
                    paymentOwner = key;
                }
            });
        });
    });
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
            $('.check_trx span').html('');
            db.ref(`links/${paymentOwner}/${link_id}/DAI_collected`).set(count.dai_received+1).then((snap) => {
                key = snap.key;
                console.log(key);
             });
            db.ref(`links/${paymentOwner}/${link_id}/total_transaction`).set(Number(count.no_of_transactions)+Number(count.price)).then((snap) => {
                key = snap.key;
                console.log(key);
            });
        } else {
            alert(err);
        };
    });
}

getQueryParams();

// Check the transaction on Etherscan
function checkTxn() {
    var url = 'https://ropsten.etherscan.io/tx/' + res;
    window.open(url,'_blank','resizable=yes');
}
