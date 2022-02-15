const { fetchBondROI, fetchStakingROI } = require("./fetchROI");
const { getTokenPrice } = require("./fetchPrice");

/**
 * Determined whether strategy should stake or bond
 * @param provider        - network provider
 * @param strat           - a strategy from strats
 * @param amountIn        - amount of rebase tokens to be bonded
 * @returns bond object if bonding is better, null if should continue staking
 */
const shouldBond = async (provider, strat, amountIn) => {
  const stakingROI = await fetchStakingROI(provider, strat, 15);

  const shouldBondData = {
    shouldBond: false,
    bond: null,
    bondROI: 0,
    isLp: false,
  };
  const marketPrice = await getTokenPrice(strat);

  for (i = 0; i < strat.bonds.length; i++) {
    let bondObject = strat.bonds[i];
    let bondROI = await fetchBondROI(
      provider,
      bondObject,
      amountIn,
      marketPrice,
      strat.platformTokenAddress
    );
    console.log(`Overall Bond ROI for ${bondObject.bondToken}: ${bondROI}`);
    if (bondROI > shouldBondData.bondROI) {
      shouldBondData.bond = bondObject.address;
      shouldBondData.bondROI = bondROI;
      shouldBondData.isLp = bondObject.isLp;
    }
  }

  if (shouldBondData.bondROI / 100 > stakingROI / 2 + 0.01)
    shouldBondData.shouldBond = true;

  return shouldBondData;
};

module.exports = { shouldBond };
