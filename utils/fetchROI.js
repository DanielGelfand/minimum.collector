const { ethers } = require("ethers");
const { chains } = require("../data/chains.js");
const { getTokenPrice } = require("./fetchPrice.js");
const { strats } = require("../data/strats.js");
const pairContractABI = require("../abi/PairContract.json");
const spaStakingABI = require("../abi/SpartacusStaking.json");
const stakedSpaABI = require("../abi/StakedSpaContract.json");

/**
 * Finds the bond with the max discount
 * @param strat - a strategy from strats
 * @returns LIST [bond discount, bond]
 */
const fetchBondROI = async (strat) => {
  const provider = new ethers.providers.JsonRpcProvider(
    chains[strat.chainId].rpc
  );

  // Gets the market price of the rebase token - SPA,OHM,etc.
  let marketPrice = await getTokenPrice(strat);
  // console.log("Market price:", marketPrice);
  let bondDiscount = Number.NEGATIVE_INFINITY;
  let bondToUse = null;
  for (let i = 0; i < strat.bonds.length; i++) {
    let currBond = strat.bonds[i];
    let bondContract = new ethers.Contract(
      currBond.bondAddress,
      currBond.bondABI.abi,
      provider
    );
    let bondPriceHex = await bondContract.bondPriceInUSD();
    let bondPrice = Number(bondPriceHex.toString()); // 18 decimals bond price
    // get percentage difference between rebase token price and bond to get discount
    let currBondDiscount =
      (marketPrice * Math.pow(10, 18) - bondPrice) / bondPrice;

    if (currBondDiscount > bondDiscount) {
      bondDiscount = currBondDiscount;
      bondToUse = currBond;
    }
  }
  return [bondDiscount, bondToUse];
};

// (async () => {
//   const maxBondInfo = await fetchBondROI(strats[0]);
//   console.log("Best bond discoint is:", maxBondInfo[0]);
//   console.log("Best bond is:", maxBondInfo[1]);
// })()

/**
 * Gets the staking ROI for the given time epriod in rebases
 * @param strat       - a strategy from strats
 * @param numRebases  - number of rebases for ROI calculation (5*3 for 5 day ROI)
 * @returns FLOAT staking roi
 */
const fetchStakingROI = async (strat, numRebases) => {
  const provider = new ethers.providers.JsonRpcProvider(
    chains[strat.chainId].rpc
  );

  // Calculating staking
  const stakingContract = new ethers.Contract(
    strat.stakingContract,
    spaStakingABI.abi,
    provider
  );
  const epoch = await stakingContract.epoch();
  const stakingReward = epoch.distribute;

  const stakedTokenContract = new ethers.Contract(
    strat.stakedTokenContract,
    stakedSpaABI.abi,
    provider
  );

  const circ = await stakedTokenContract.circulatingSupply();
  const stakingRebase =
    Number(stakingReward.toString()) / Number(circ.toString());
  console.log("Rebase rate:", stakingRebase);
  const roi = Math.pow(1 + stakingRebase, numRebases) - 1;
  return roi;
};

// (async () => {
//   console.log("Staking 5-day ROI is:", await fetchStakingROI(strats[0],15))
// })()

module.exports = { fetchBondROI, fetchStakingROI };
