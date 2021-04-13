require('babel-register')
require('babel-polyfill')
require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const ContractKit = require('@celo/contractkit')
const Web3 = require('web3')

function getCeloProvider(network) {
  const web3 = new Web3(`https://celo-${network}--rpc.datahub.figment.io/apikey/${process.env.DATAHUB_API_KEY}/`)
  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)

  const client = ContractKit.newKitFromWeb3(web3)
  client.addAccount(account.privateKey)
  return client.web3.currentProvider
}

const alfajoresProvider = getCeloProvider('alfajores')
const celoMainnetProvider = getCeloProvider('mainnet')

module.exports = {
  networks: {
    development: { // Local development
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
    },
    alfajores: { // Not yet supported by The Graph
      provider: alfajoresProvider,
      network_id: '44787',
      skipDryRun: true,
    },
    celo: {
      provider: celoMainnetProvider,
      network_id: '42220'
    },
  },
  compilers: {
    solc: {
      version: '0.4.25'
    }
  }
}
