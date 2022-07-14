# Kraken Token

This repository contains an ERC-721 token smart contract and some auxiliary code to test and deploy the contract.

### Prerequisites
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository
- Navigate to the directory with the cloned code
- Install [Hardhat](https://hardhat.org/) with `npm install --save-dev hardhat`

### Build
```
npx hardhat compile
```

### Test
```
npx hardhat test
```

### Run JavaScript Scripts
```
npx hardhat run scripts/[script_name] --network [network_name]
```
For example run
```
npx hardhat run scripts/deploy.js --network mumbai
```
to deploy the token to Mumbai test network.

__Supported networks__:
- Hardhat local network: `--network localhost`
  - You have to start local node with `npx hardhat node` before running any script
- Polygon Mumbai test network (main): `--network mumbai`

