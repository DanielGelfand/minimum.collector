const ethers = require("ethers");
const { fetchBondROI, fetchStakingROI } = require("../utils/fetchROI.js");
const { strats } = require("../data/strats.js");

/**
 * Determined whether strategy should stake or bond
 * @param strat - a strategy from strats
 * @returns bond object if bonding is better, null if should continue staking
 */
const bondOrStake = async (strat) => {
  let bondROI = await fetchBondROI(strat);
  let stakingROI = await fetchStakingROI(strat, 15);

  console.log("Bonding ROI:", bondROI[0]);
  console.log("Staking ROI:", stakingROI);
  console.log(bondROI[1]);
  // Include price impact in here in the future
  if (bondROI[0] > stakingROI / 2 + 0.01) {
    return bondROI[1];
  }

  return null;
};

(async () => {
  console.log("Bond Or Stake:", await bondOrStake(strats[0]))
})()

module.exports = { bondOrStake };
