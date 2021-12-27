
/* global ethers task */
require('@nomiclabs/hardhat-waffle')
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const OPTIMISTIC_PRIVATE_KEY = process.env.OPTIMISTIC_PRIVATE_KEY;
const OPTIMISTIC_ADDRESS = process.env.OPTIMISTIC_ADDRESS;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    optimism: {
      url: 'https://mainnet.optimism.io/',
      from: OPTIMISTIC_ADDRESS,
      chainId: 10,
      accounts: [OPTIMISTIC_PRIVATE_KEY],
    }
  }
}
