/* global ethers */
/* eslint prefer-const: "off" */
const DIAMOND_ADDRESS = '0xe20f1ADE8B176F76E8D403d67E7D1512348E6fAB'

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deployDiamond () {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // Diamond
  const diamond = await ethers.getContractAt('Diamond', DIAMOND_ADDRESS)

  // deploy new facets
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
    'ERC20BatchFacet',
  ]
  const cut = []
  const Facet = await ethers.getContractFactory(FacetNames[0])
  const facet = await Facet.attach('0xb3D8aD01Ba9e076A9CFB118A0af10a455d1A36f5')

  console.log(`${FacetNames[0]} deployed: ${facet.address}`)
  cut.push({
    facetAddress: facet.address,
    action: FacetCutAction.Add,
    functionSelectors: getSelectors(facet)
  })
  console.log(`it has ${cut[0].functionSelectors.length} selectors`)

  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
  let tx
  let receipt
  tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x')
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
