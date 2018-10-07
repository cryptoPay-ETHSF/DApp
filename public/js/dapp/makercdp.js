function GetCDPData() {
    var CPDeferPay = web3.eth.contract(cryptoPayABI).at(KovanCP);
    CPDeferPay.BorrowerCDP(account, function (err, res) {
        if (!err) {
            MakerDAOContract.cups(res, function (err, res2) {
                if (!err) {
                    var LockedETH = (String(res2[1]) / 10**18).toFixed(3);
                    var DrawnDAI = String(res2[2]) / 10**18;
                    var collPercent = (DrawnDAI / (LockedETH * 280) * 100).toFixed(1);
                    console.log(LockedETH, DrawnDAI, collPercent);

                    $('.daiTaken').text(`Ξ ${DrawnDAI}`);
                    $('.lockedETH').text(`Ξ ${LockedETH}`);
                    $('.collatPercent').text(`Ξ ${collPercent}`);

                } else {
                    console.log(err);
                };
            });
        } else {
            console.log(err);
        };
    });
}

GetCDPData();