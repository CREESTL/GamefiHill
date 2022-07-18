// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A user avatar NFT token
contract Kraken is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /// @dev Idintifies if a user has minted a token
    mapping(address => bool) mintedTokens;

    /// @dev Maximum number of tokens to mint
    uint256 constant public maxTotalSupply = 6_000_000; 

    constructor() ERC721("Kraken", "KRK") {}

    /// @notice Issues 1 token with a provided URI to the caller
    /// @notice Returns new token's ID
    /// @param tokenURI The URI of item in the IPFS storage
    /// @return ID of the new token
    function giveMeToken(string memory tokenURI) public returns (uint256)  {

        /// @dev Get the current latest ID. Starts with 0.
        uint256 newItemId = _tokenIds.current();
        /// @dev Check whether ID is greater than max total supply
        /// @notice If someone burns his token, it will not affect the number of minted tokens
        require(newItemId <= maxTotalSupply, "Total Supply of Tokens Exceeded");

        /// @notice User can mint only one token
        require(!mintedTokens[msg.sender], "Only a Single Token for Address is Allowed!");
        mintedTokens[msg.sender] = true;

        /// @dev Mint token with the ID to the user
        _mint(msg.sender, newItemId);

        /// @dev Set the URI of the token
        _setTokenURI(newItemId, tokenURI);

        /// @dev Increment token's ID
        _tokenIds.increment();

        return newItemId;
    }

    /// @notice Issues 1 token with a provided URI to the provided address
    /// @notice Returns new token's ID
    /// @notice Can only be called by the owner of the contract
    /// @param tokenURI The URI of item in the IPFS storage
    /// @return ID of the new token
    function giveTokenTo(address user, string memory tokenURI) public onlyOwner returns (uint256)  {

        /// @dev Get the current latest ID. Starts with 0.
        uint256 newItemId = _tokenIds.current();
        /// @dev Check whether ID is greater than max total supply
        /// @notice If someone burns his token, it will not affect the number of minted tokens
        require(newItemId <= maxTotalSupply, "Total Supply of Tokens Exceeded");

        /// @notice Only one token for a user can be minted
        require(!mintedTokens[user], "Only a Single Token for Address is Allowed!");
        mintedTokens[user] = true;

        /// @dev Mint token with the ID to the user
        _mint(user, newItemId);

        /// @dev Set the URI of the token
        _setTokenURI(newItemId, tokenURI);

        /// @dev Increment token's ID
        _tokenIds.increment();

        return newItemId;
    }

    /// @notice Get the maximum supply of tokens
    function maxTotalSupply() public pure returns (uint256) {
        return maxTotalSupply;
    }

    /// @notice Get the current supply of tokens
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

}