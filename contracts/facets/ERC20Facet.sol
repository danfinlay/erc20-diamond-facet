// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import { ERC20 } from "../solidstate-solidity/token/ERC20/ERC20.sol";
import {ERC20MetadataStorage } from 'contracts/solidstate-solidity/token/ERC20/metadata/ERC20Metadata.sol';

contract ERC20Facet is ERC20 {
    using ERC20MetadataStorage for ERC20MetadataStorage.Layout;

    function setupERC20Token(string calldata name, string calldata symbol, uint8 decimals) public {
        LibDiamond.enforceIsContractOwner();
        ERC20MetadataStorage.Layout storage l = ERC20MetadataStorage.layout();

        l.setName(name);
        l.setSymbol(symbol);
        l.setDecimals(decimals);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        LibDiamond.enforceIsContractOwner();
    }
}
