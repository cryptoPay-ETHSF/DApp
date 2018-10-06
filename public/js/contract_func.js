var contract_address = '0xfDa504E1CC6fbA897A109cE5122200DB0A8AD392';
var contract_initialize = web3.eth.contract(cryptoPayABI).at(contractAddress);

contract_initialize.DeferredPay(pay_to, dai_amount, payObj, function (err, res) {
    if (!err) {

    } else {
        console.log(err);
    };
});