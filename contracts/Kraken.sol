// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Kraken is ERC721URIStorage {
    
    // TODO totalSupply

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => bool) mintedTokens;

    uint16 constant totalSupply = 60_000; 

    constructor() ERC721("Kraken", "KRK") {}

    // Issues 1 token with a provided URI to the user
    // Returns new token's ID
    // Can only be called by the 
    function giveMeToken(string memory tokenURI) public returns (uint256) {

        // Get the current latest ID
        // First ID is 0
        uint256 newItemId = _tokenIds.current();
        // Check whether ID is greater than max supply
        require(newItemId <= totalSupply, "Total Supply of Tokens Exceeded");
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

    // TODO admin giveToken
}