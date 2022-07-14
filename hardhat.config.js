require("@nomicfoundation/hardhat-toolbox");
const { ethers } = require("ethers");

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {runs: 1, enabled: true},
        },
      },
    ],
  },
  networks: {
    // a.k.a localhost
    hardhat: {
      // Create 20 Signers with 1000 wei(not ETH!!!) each
      accounts: {
        count: 20,
        accountsBalance: ethers.utils.parseEther('1000').toString(),
      },
    },
  },
  mocha: {
    timeout: 20000000,
  },
  paths: {
    sources: "./contracts/",
    tests: "./test/",
  },
};


