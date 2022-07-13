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
  let addrs;

  let uri = "uri_string";

  // Hook
  beforeEach(async function () {

    _kraken = await ethers.getContractFactory("Kraken");
    kraken = await _kraken.deploy();
    await kraken.deployed();
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  describe("Deployment", function () {  
    it("Should be named Kraken", async function () {
      expect(await kraken.name()).to.equal("Kraken");
    });

    it("Should have a Kraken symbol", async function () {
      expect(await kraken.symbol()).to.equal("KRK");
    });


  });

  describe("Transactions", function () {

    it("Should mint tokens to accounts", async function () {
      await kraken.connect(addr1).giveMeToken(uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(1);
    });

    it("Should not mint more than one token for address", async function () {
      await kraken.giveToken(addr1.address, uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(1);
      await expect(kraken.giveToken(addr1.address, uri)).to.revertedWith("Only a Single Token for Address is Allowed!");
    });    

    it("Should increment token ID after mint", async function () {
      expect(addr1.address).to.not.be.equal(addr2.address);
      await kraken.connectgiveToken(addr1.address, uri);
      await kraken.giveToken(owner.address, uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      await kraken.connect(addr1).approve(addr2.address, 0);
      await kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 1);
    });


    it("Should transfer tokens between accounts", async function () {
      await kraken.giveToken(addr1.address, uri);
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(1);
      await kraken.connect(addr1).approve(addr2.address, 0);
      await kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      const addr2Balance = await kraken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(1);
    });

    it("Should fail transfer of token with incorrect ID", async function () {

      await kraken.giveToken(addr1.address, uri);
      await kraken.connect(addr1).approve(addr2.address, 0);
      await kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      await expect(kraken.connect(addr1).transferFrom(addr1.address, addr2.address, 777)).to.be.revertedWith("ERC721: invalid token ID");
    
    });

    it("Should update balances after transfers", async function() {
      await kraken.mint(owner.address, 10000);
      const initialOwnerBalance = await kraken.balanceOf(owner.address);

      expect(initialOwnerBalance).to.equal(10000);

      // Transfer 100 tokens from owner to addr1
      await kraken.approve(addr1.address, 100);
      await kraken.transfer(addr1.address, 100);

      // Transfer 500 tokens from owner to addr2
      await kraken.approve(addr2.address, 500);
      await kraken.transfer(addr2.address, 500);

      // Check that final owner balance decreased by 600
      const finalOwnerBalance = await kraken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(600));

      // Check that addr1 balance increased by 100
      const addr1Balance = await kraken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      // Check that addr2 balance increased by 500
      const addr2Balance = await kraken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(500);

    });

  });


});
