const ethers = require("ethers");
const { fetchBondROI, fetchStakingROI } = require("../utils/fetchROI.js");
const { calculatePriceImpact } = require("../utils/priceImpact.js");
const { strats } = require("../data/strats.js");

/**
 * Determined whether strategy should stake or bond
 * @param strat - a strategy from strats
 * @returns bond object if bonding is better, null if should continue staking
 */
const bondOrStake = async (strat, amountIn) => {
  let bondROI = await fetchBondROI(strat);
  let stakingROI = await fetchStakingROI(strat, 15);

  console.log("Bonding ROI:", bondROI[0]);
  console.log("Staking ROI:", stakingROI);

  let priceImpact = await calculatePriceImpact(
    strat.platformTokenAddress,
    amountIn,
    bondROI[1].pairAddress,
    bondROI[1].token0Route,
  )

  console.log(`Price Impact From bondorStake: ${priceImpact}%`);

  // Include price impact in here in the future
  if (bondROI[0] - (priceImpact/100) > stakingROI / 2 + 0.01) {
    return bondROI[1];
  }

  return null;
};

// (async () => {
//   console.log("Bond Or Stake:", await bondOrStake(strats[2], 15000))
// })()

module.exports = { bondOrStake };
