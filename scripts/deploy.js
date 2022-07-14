// SPDX-License-Identifier: MIT 
const hre = require("hardhat");

/*
  Run it with `npx hardhat run --network *desired network name*`
*/

async function main() {

  // Get different avaliable addresses
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  
  // We get the contract to deploy
  // Deploy the token
  _kraken = await ethers.getContractFactory("Kraken");
  ttt = await _kraken.deploy();
  await ttt.deployed();

  console.log("Kraken deployed to:", ttt.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
