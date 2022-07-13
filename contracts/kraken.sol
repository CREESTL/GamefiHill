// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Kraken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Kraken", "KRK") {}

    // Issues 1 token with a provided URI to the user
    // Returns new token's ID
    function giveToken(address user, string memory tokenURI) public returns (uint256) {

        // Get the current latest ID
        uint256 newItemId = _tokenIds.current();
        // Mint token with the ID to the user
        _mint(user, newItemId);
        // Set the URI of the token
        _setTokenURI(newItemId, tokenURI);
        // Increment ID
        _tokenIds.increment();

        return newItemId;
    }
}