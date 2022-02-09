const axios = require("axios");
const { ethers } = require("ethers");
const pairContractABI = require("../abi/PairContract.json");
const { chains } = require("../data/chains.js");
const { strats } = require("../data/strats.js");

/**
 * Gets price of rebase token
 * @param strat - a strategy from strats
 * @returns INTEGER usd value
 */
const getTokenPrice = async (strat) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      chains[strat.chainId].rpc
    );
    const pairContract = new ethers.Contract(
      strat.usdPriceLP,
      pairContractABI.abi,
      provider
    );
    const reserves = await pairContract.getReserves();

    let numeratorIndex = strat.protocolTokenFirst ? 1 : 0;

    let price =
      Number(reserves[numeratorIndex].toString()) /
      Number(reserves[1 - numeratorIndex].toString());
    price = price * Math.pow(10, -9);
    return price;
  } catch (e) {
    console.log("LP Price Fetch Error");
    let tokenId = strat.platformToken;
    let resp;
    try {
      resp = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
      );
      return resp.data[tokenId].usd;
    } catch (e) {
      console.log("coingecko api error: ", e);
    }
  }
};

module.exports = { getTokenPrice };
