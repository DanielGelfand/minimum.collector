const { ethers } = require("ethers");
const { getTokenPrice } = require("./fetchPrice");
const spaStakingABI = require("../abi/SpartacusStaking.json");
const stakedSpaABI = require("../abi/StakedSpaContract.json");
const { calculatePriceImpact } = require("./priceImpact");

/**
 * Finds the bond ROI of a bond
 * @param provider              - network provider
 * @param bondObject            - a bond object with details about the bond
 * @param amountIn              - the amount of rebase tokens to be bonded
 * @param marketPrice           - the market price of the rebase token
 * @param platformTokenAddress  - the platform tokens address, for price impact
 * @returns FLOAT staking roi
 */
const fetchBondROI = async (
  provider,
  bondObject,
  amountIn,
  marketPrice,
  platformTokenAddress
) => {
  const bondContract = new ethers.Contract(
    bondObject.address,
    bondObject.abi,
    provider
  );
  const bondPriceHex = await bondContract.bondPriceInUSD();
  const bondPrice = Number(bondPriceHex.toString());
  const bondROI = (marketPrice * Math.pow(10, 18)) / bondPrice - 1;

  const priceImpact = await calculatePriceImpact(
    provider,
    platformTokenAddress,
    bondObject.isLp ? amountIn / 2 : amountIn,
    bondObject.pairAddress,
    bondObject.token0Route
  );

  return bondROI * 100 - priceImpact;
};

/**
 * Gets the staking ROI for the given time epriod in rebases
 * @param provider    - network provider
 * @param strat       - a strategy from strats
 * @param numRebases  - number of rebases for ROI calculation (5*3 for 5 day ROI)
 * @returns FLOAT staking roi
 */
const fetchStakingROI = async (provider, strat, numRebases) => {
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

module.exports = { fetchBondROI, fetchStakingROI };
