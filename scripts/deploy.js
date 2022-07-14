// SPDX-License-Identifier: MIT 
const hre = require("hardhat");

async function main() {

  // Get different avaliable addresses
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  
  // We get the contract to deploy
  // Deploy the token
  _kraken = await ethers.getContractFactory("Kraken");
  kraken = await _kraken.deploy();
  await kraken.deployed();

  console.log("Kraken deployed to:", kraken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
