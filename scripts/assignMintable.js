/* global ethers */
/* eslint prefer-const: "off" */
const DIAMOND_ADDRESS = '0xf824a5f172BA61A050eBd166391a20932e036513'
const MINTABLE_ADDRESS = '0xed9A3271c8Bf0133aba5585c96251e0884C94f9D'
const grants = require('../grants.json')

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond () {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  const mintable = await ethers.getContractAt('ERC20MintableFacet', DIAMOND_ADDRESS)
  const amount = ethers.utils.parseEther('10000').toHexString();

  for await (const grantee of grants) {
    console.log(`Granting to ${grantee}`)
    await mintable.mint(grantee, amount)
    console.log(`Granted to ${grantee}`)
  }
  return diamond.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond
