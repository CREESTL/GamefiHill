# Kraken Token

This repository contains an ERC-721 token smart contract and some auxiliary code to test and deploy the contract.

### Prerequisites
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository
- Navigate to the directory with the cloned code
- Install [Hardhat](https://hardhat.org/) with `npm install --save-dev hardhat`
- Add [Polygon Mainnet](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) to MetaMask
  - Switch to Polygon Mainnet in MetaMask
- Create a file called `.env` in the root of the project
- Export your private key from MetaMask to `.env` file
```
POLYGON_PRIVATE_KEY=***your private key from MetaMask***
```
- Create an account on [Polygonscan](https://polygonscan.com/)
  - Go to "My Profile" - "API_KEYs"
  - Create a new API KEY
  - Copy "Api-Key Token"
- Export your Polygonscan API KEY to `.env` file
```
POLYGONSCAN_API_KEY=***your API key from Polygonscan***
```

__DO NOT SHARE YOUR .env FILE IN ANY WAY OR YOU RISK TO LOSE ALL YOUR FUNDS__

---

### Build
```
npx hardhat compile
```

### Test
```
npx hardhat test
```

### Deploy
а) Mumbai test network
```
npx hardhat run scripts/deploy.js --network mumbai
```  
b) Polygon main network
```
npx hardhat run scripts/deploy.js --network polygon
```

__Supported networks__:
- Hardhat local network: `--network localhost`
  - You have to start local node with `npx hardhat node` before running any script (except tests)
- Polygon Mumbai test network: `--network mumbai`
- Polygon main network: `--network polygon`


---

### Main Functions

1. `giveMeToken`: 
  - Issues one (and only one) token for the caller
  - Can be called by anyone
  - No additional payments except for gas fees  
2. `giveTokenTo`:
  - Issues one (and only one) token for the provided user
  - Can only be called by the owner of the contract
  - No additional payments except for gas fees

Please note that _both_ functions require a 'uri' string as a parameter. 
