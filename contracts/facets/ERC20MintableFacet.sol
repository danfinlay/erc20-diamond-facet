// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { LibDiamond } from "../libraries/LibDiamond.sol";
import { ERC20BaseStorage } from './ERC20BaseStorage.sol';

contract ERC20MintableFacet {
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @notice mint tokens for given account
     * @param account recipient of minted tokens
     * @param amount quantity of tokens minted
     */
    function mint(address account, uint256 amount) external {
        LibDiamond.enforceIsContractOwner();

        ERC20BaseStorage.Layout storage l = ERC20BaseStorage.layout();
        l.totalSupply += amount;
        l.balances[account] += amount;

        emit Transfer(address(0), account, amount);
    }
}
