// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20BaseInternal } from "../solidstate-solidity/token/ERC20/base/ERC20BaseInternal.sol";
import { LibDiamond } from "../libraries/LibDiamond.sol";

contract ERC20BatchFacet is ERC20BaseInternal {

    function batchTransfer(address[] calldata recipients, uint256[] calldata amounts) external {
        require(recipients.length == amounts.length, "Recipients length different than amounts");
        for(uint256 i; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amounts[i]);
        }
    }

    function batchMint(address[] calldata recipients, uint256[] calldata amounts) external {
        LibDiamond.enforceIsContractOwner();
        require(recipients.length == amounts.length, "Recipients length different than amounts");
        for(uint256 i; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

}
