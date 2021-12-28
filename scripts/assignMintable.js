/* global ethers */
/* eslint prefer-const: "off" */
const DIAMOND_ADDRESS = '0xe20f1ADE8B176F76E8D403d67E7D1512348E6fAB'
const MINTABLE_ADDRESS = '0xE84988f1bb0c18Bb7C24FE3d2Aa26f8c51e1224e'

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond () {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // Diamond
  const diamond = await ethers.getContractAt('Diamond', DIAMOND_ADDRESS)
  const mintable = await ethers.getContractAt('ERC20MintableFacet', MINTABLE_ADDRESS)

  const cut = []
  cut.push({
    facetAddress: MINTABLE_ADDRESS,
    action: FacetCutAction.Add,
    functionSelectors: ['0x40c10f19'] // mint()
  })

  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
  let tx
  let receipt
  tx = await diamondCut.diamondCut(cut, MINTABLE_ADDRESS, '0x')
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')

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
