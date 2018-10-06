var cryptoPayABI = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "BorrowerCDP",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DAIToken",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "payTo",
          "type": "address"
        },
        {
          "name": "src",
          "type": "address"
        },
        {
          "name": "srcAmt",
          "type": "uint256"
        },
        {
          "name": "HowMuchToPay",
          "type": "uint256"
        }
      ],
      "name": "InstantPay",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MKR",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "CDPAddr",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PETH",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "WETH",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "payTo",
          "type": "address"
        },
        {
          "name": "daiAmt",
          "type": "uint256"
        }
      ],
      "name": "DeferredPay",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "KyberAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "AllSoldAmt",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "onChainPrice",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ETHToken",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DAI",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "AllSoldTx",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];

  const tokensAbi = [{
    "constant": true,
    "inputs": [{
        "name": "_owner",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "name": "balance",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "_owner",
            "type": "address"
        },
        {
            "name": "_spender",
            "type": "address"
        }
    ],
    "name": "allowance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_spender",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": true,
            "name": "_owner",
            "type": "address"
        },
        {
            "indexed": true,
            "name": "_spender",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
}];



const kyberMainABI = [{
    "constant": true,
    "inputs": [

    ],
    "name": "enabled",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "src",
            "type": "address"
        },
        {
            "name": "dest",
            "type": "address"
        },
        {
            "name": "srcQty",
            "type": "uint256"
        }
    ],
    "name": "getExpectedRate",
    "outputs": [{
            "name": "expectedRate",
            "type": "uint256"
        },
        {
            "name": "slippageRate",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [

    ],
    "name": "maxGasPrice",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "src",
            "type": "address"
        },
        {
            "name": "srcAmount",
            "type": "uint256"
        },
        {
            "name": "dest",
            "type": "address"
        },
        {
            "name": "destAddress",
            "type": "address"
        },
        {
            "name": "maxDestAmount",
            "type": "uint256"
        },
        {
            "name": "minConversionRate",
            "type": "uint256"
        },
        {
            "name": "walletId",
            "type": "address"
        }
    ],
    "name": "trade",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": true,
            "name": "trader",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "src",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "dest",
            "type": "address"
        },
        {
            "indexed": false,
            "name": "actualSrcAmount",
            "type": "uint256"
        },
        {
            "indexed": false,
            "name": "actualDestAmount",
            "type": "uint256"
        }
    ],
    "name": "ExecuteTrade",
    "type": "event"
}];
