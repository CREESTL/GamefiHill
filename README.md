# Kraken Token

This repository contains an ERC-721 token smart contract and some auxiliary code to test and deploy the contract.

### Prerequisites :page_with_curl:
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository
- Navigate to the directory with the cloned code
- Install [Hardhat](https://hardhat.org/) with `npm install --save-dev hardhat`
- Create a [MetaMask](https://metamask.io/) wallet
  - Install MetaMask Chrome extension
  - Add [Polygon Mainnet](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) to MetaMask
  - Switch to Polygon Mainnet
- Create a file called `.env` in the root of the project with the same contents as `.env.example`
- Copy your private key from MetaMask to `.env` file
```
POLYGON_PRIVATE_KEY=***your private key from MetaMask***
```
- Create an account on [Polygonscan](https://polygonscan.com/)
  - Go to "My Profile" - "API_KEYs"
  - Create a new API KEY
  - Copy "Api-Key Token"
- Copy your Polygonscan API KEY to `.env` file
```
POLYGONSCAN_API_KEY=***your API key from Polygonscan***
```
:warning:__DO NOT SHARE YOUR .env FILE IN ANY WAY OR YOU RISK TO LOSE ALL YOUR FUNDS__:warning:

---
Next steps will show you how to _build_ and _deploy_ the contract :computer:.  

### 1. Build
```
npx hardhat compile
```

### 2. Test
```
npx hardhat test
```
Move to the "Deploy" step _only_ if all tests pass!

### 3. Deploy
а) __Mumbai__ test network  
Make sure you have _enough MATIC_ for testnet. You can get it for free from [faucet](https://faucet.polygon.technology/).  
```
npx hardhat run scripts/deploy.js --network mumbai
```  
b) __Polygon main__ network  
Make sure you have _enough MATIC_ in your wallet. Deployment to the mainnet costs real MATIC!
```
npx hardhat run scripts/deploy.js --network polygon
```
Deployment script takes more than 1.5 minutes to complete. Please, be patient.  
After the contract gets deployed and verified you can find its address in the `deployOutput.json` file. Use it to interact with the contract.  

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

Please note that _both_ functions require a `uri` string as a parameter.
