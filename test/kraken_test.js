// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests for Kraken.sol
describe("Kraken", function () {
  
  // Constants to be used afterwards
  let _kraken;
  let kraken;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  // Sample URI string
  let uri = "uri_string";

  // Hook
  beforeEach(async function () {
    // Deploy token and get valid account before each test case
    _kraken = await ethers.getContractFactory("Kraken");
    kraken = await _kraken.deploy();
    await kraken.deployed();
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
  });

  describe("Deployment", function () {  

    it("Should be named Kraken", async function () {
      expect(await kraken.name()).to.equal("Kraken");
    });

    it("Should have a KRK symbol", async function () {
      expect(await kraken.symbol()).to.equal("KRK");
    });

  });

  describe("Transactions", function () {

    it("Should mint tokens to accounts", async function () {
      // Mint a single token to account
      await kraken.connect(addr1).giveMeToken(uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(1);
    });

    it("Should not mint more than one token for address", async function () {
      // Mint the first token to account
      await kraken.connect(addr1).giveMeToken(uri);
      // Try mint the second token to account
      await expect(kraken.connect(addr1).giveMeToken(uri)).to.revertedWith("Only a Single Token for Address is Allowed!");
    });

    it("Should transfer tokens between accounts", async function () {
      // Mint one token to first account
      await kraken.connect(addr1).giveMeToken(uri);
      // First account's balance should be 1
      // Second account's balance should be 0
      let addr1BalanceInitial = await kraken.balanceOf(addr1.address);
      expect(addr1BalanceInitial).to.equal(1);      
      let addr2BalanceInitial = await kraken.balanceOf(addr2.address);
      expect(addr2BalanceInitial).to.equal(0);
      // Approve and transfer 1 token from first account to the second one
      await kraken.connect(addr1).approve(addr2.address, 0);
      await kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      // First account's balance should be 0
      // Second account's balance should be 1
      let addr1BalanceFinal = await kraken.balanceOf(addr1.address);
      expect(addr1BalanceFinal).to.equal(0);      
      let addr2BalanceFinal = await kraken.balanceOf(addr2.address);
      expect(addr2BalanceFinal).to.equal(1);
    });


    it("Should increment token ID after mint", async function () {
      // Mint token with ID = 0
      await kraken.connect(addr1).giveMeToken(uri);
      // Mint token with ID = 1
      await kraken.connect(addr2).giveMeToken(uri);
      // Approve transfer of the latest minted token
      // If ID was not incremented, this line should fail
      await kraken.connect(addr2).approve(addr1.address, 1);
      // Transfer latest minted token
      await kraken.connect(addr2).transferFrom(addr2.address, addr1.address, 1);
    });

    it("Should fail transfer of token with incorrect ID", async function () {
      // Mint token with ID = 0
      await kraken.connect(addr1).giveMeToken(uri);
      // Approve and transfer this token
      await kraken.connect(addr1).approve(addr2.address, 0);
      await kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      // Try to transfer token with ID = 777 (does not exist)
      await expect(kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 777)).to.be.revertedWith("ERC721: invalid token ID");
    
    });

    it("Should have correct max total supply", async function () {
      // Max total supply should be equal to 6 000 000
      let maxTotalSupply = await kraken.maxTotalSupply();
      expect(maxTotalSupply).to.equal(6_000_000);
    });

    it("Should have correct total supply", async function () {
      // Mint 3 tokens
      await kraken.connect(addr1).giveMeToken(uri);
      await kraken.connect(addr2).giveMeToken(uri);
      await kraken.connect(addr3).giveMeToken(uri);
      // Total supply should be equal to 3
      let maxTotalSupply = await kraken.totalSupply();
      expect(maxTotalSupply).to.equal(3);
    });

    it("Should transfer ownership", async function () {
      // Check the first owner
      expect(await kraken.owner()).to.equal(owner.address);
      // Transfer ownership to the other address
      await kraken.connect(owner).transferOwnership(addr1.address);
      // Check the second owner
      expect(await kraken.owner()).to.equal(addr1.address);
      // Check that transfer works as well
      await kraken.connect(addr1).giveMeToken(uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(1);
    });

  });

});
