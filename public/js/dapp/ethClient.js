// window.addEventListener("load", () => {
var checklist = {};
checklist.isMetaMaskInstalled = false;
checklist.isLoggedIn = false;
checklist.isSupportedNetwork = false;
checklist.networkId = 0;

/* Code For checking width compatibility */
var account;
if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
    if (web3.currentProvider) {
        checklist.isMetaMaskInstalled = true;
        web3 = new Web3(web3.currentProvider);
        account = web3.eth.accounts[0];

        console.log(account);

        if (account.length != 0) {
          checklist.isLoggedIn = true; 
          console.log('Working Great');
        }
        
        var netId = web3.version.network;
        checklist.networkId = netId;
        if (netId === "1" || netId === "42" || netId === "3") {
          checklist.isSupportedNetwork = true;
        }
    } else {
        console.log('not conected via any client');
    }
}

// declared variables
var RopstenCP = 0x9dbe1442e63b56455a338e73508852164f30cb1b;
var KovanCP = "";

var mainKyberAdd = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
var mainKyberContract = web3.eth.contract(kyberMainABI).at(mainKyberAdd);