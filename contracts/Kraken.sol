// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Kraken is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Idintifies if a user has minted a token
    mapping(address => bool) mintedTokens;

    // Maximum number of tokens to mint
    uint256 constant public maxTotalSupply = 6_000_000; 

    constructor() ERC721("Kraken", "KRK") {}

    // Issues 1 token with a provided URI to the caller
    // Returns new token's ID
    function giveMeToken(string memory tokenURI) public returns (uint256)  {

        // Get the current latest ID
        // First ID is 0
        uint256 newItemId = _tokenIds.current();
        // Check whether ID is greater than max total supply
        // If someone burns his token, it will not affect the number of minted tokens
        require(newItemId <= maxTotalSupply, "Total Supply of Tokens Exceeded");

        // User can mint only one token
        require(!mintedTokens[msg.sender], "Only a Single Token for Address is Allowed!");
        mintedTokens[msg.sender] = true;

        // Mint token with the ID to the user
        _mint(msg.sender, newItemId);

        // Set the URI of the token
        _setTokenURI(newItemId, tokenURI);

        // Increment ID
        _tokenIds.increment();

        return newItemId;
    }

    // Issues 1 token with a provided URI to the user
    // Returns new token's ID
    // Can only be called by the owner of the contract!
    function giveTokenTo(address user, string memory tokenURI) public onlyOwner returns (uint256)  {

        // Get the current latest ID
        // First ID is 0
        uint256 newItemId = _tokenIds.current();
        // Check whether ID is greater than max total supply
        // If someone burns his token, it will not affect the number of minted tokens
        require(newItemId <= maxTotalSupply, "Total Supply of Tokens Exceeded");

        // Only one token for a user can be minted
        require(!mintedTokens[user], "Only a Single Token for Address is Allowed!");
        mintedTokens[user] = true;

        // Mint token with the ID to the user
        _mint(user, newItemId);

        // Set the URI of the token
        _setTokenURI(newItemId, tokenURI);

        // Increment ID
        _tokenIds.increment();

        return newItemId;
    }

    // Getter for maxTotalSupply
    // (max number of tokens to mint)
    function maxTotalSupply() public pure returns (uint256) {
        return maxTotalSupply;
    }

    // Getter for totalSupply
    // (number of tokens minted)
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

}