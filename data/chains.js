const { addressBook } = require('blockchain-addressbook');

const {fantom} = addressBook;

const chains = {
    250: {
        id: 'fantom',
        chainId: 250,
        wnative: fantom.tokens.WNATIVE.address,
        wnativeUnwrapInterval: 4,
        rpc: 'https://rpc.ftm.tools/',
        queryLimit: 500,
        queryInterval: 100,
        blockTime: 10,
        blockExplorer: 'https://ftmscan.com',
      },
}

module.exports = {chains};