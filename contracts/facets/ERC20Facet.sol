// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import { ERC20 } from "../solidstate-solidity/token/ERC20/ERC20.sol";

contract ERC20Facet is ERC20 {
    function _beforeTokenTransfer(address, address, uint256) internal view override {
        LibDiamond.enforceIsContractOwner();
    }
}
