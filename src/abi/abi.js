export const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_middleware",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ackPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ack",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "middleware",
          "type": "address"
        }
      ],
      "name": "authorizeMiddleware",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorizedMws",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "destPortAddr",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "bridgeToDstChain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mw",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "name": "onRecvUniversalPacket",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ackPacket",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "name": "onTimeoutUniversalPacket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ack",
          "type": "tuple"
        }
      ],
      "name": "onUniversalAcknowledgement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "recvedPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_middleware",
          "type": "address"
        }
      ],
      "name": "setDefaultMw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "timeoutPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]