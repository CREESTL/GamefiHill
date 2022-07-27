// SPDX-License-Identifier: MIT 
const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");
const delay = require("delay");

// JSON file to keep information about previous deployments
const OUTPUT_DEPLOY = require("./deployOutput.json");

async function main() {

  console.log("Start of Deployment...");
  
  // Get the contract and deploy it
  _kraken = await ethers.getContractFactory("Kraken");
  krakenTx = await _kraken.deploy();
  let kraken = await krakenTx.deployed();

  console.log("Deployment Finished!");
  console.log("Start of Verification...");
  
  // Sleep for 90 seconds, otherwise blockexplorer will fail
  await delay(90000);
  
  // Verify the contract
  // Provides all contract's dependencies as separate files
  try { 
    await hre.run("verify:verify", {
      address: kraken.address,
    });
  } catch (error) {
    console.error(error);
  }

  console.log("Verification Finished!");
  console.log(`See Results in "${__dirname + '/deployOutput.json'}" File`);

  // Write output to the JSON file
  OUTPUT_DEPLOY.networks[network.name].address = kraken.address;
  OUTPUT_DEPLOY.networks[network.name].verification =
    "https://mumbai.polygonscan.com/address/" + kraken.address + "#code";
  fs.writeFileSync(
    path.resolve(__dirname, "./deployOutput.json"),
    JSON.stringify(OUTPUT_DEPLOY, null, "  ")
  );
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
