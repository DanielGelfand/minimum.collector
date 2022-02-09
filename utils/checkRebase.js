const { EPOCH_INTERVAL } = require("../constants");

/**
 * Check if bond is redeemable
 * @param currentBlock - current block in the blockchain
 * @param stakingContract - strategy's staking manager contract
 * @param bondContract - strategy's bond contract that is being used
 * @param is44 - true if bond is (4,4) bond, false otherwise
 * @returns BOOLEAN true if can redeem, false otherwise
 */
const canRedeem = async (currentBlock, stakingContract, bondContract, is44) => {
  if (is44) {
    // if (4,4) bond, can only redeem when fully vested
    let percentVested = Number(bondContract.percentVestedFor(strat));
    return percentVested >= 10000;
  } else {
    // Otherwise, can redeem upon end of epoch
    epochInfo = await stakingContract.epoch();
    let endBlock = Number(epochInfo.endBlock);
    console.log("Current Block:", currentBlock);
    console.log("End Block:", endBlock);

    return currentBlock >= endBlock;
  }
};

module.exports = { canRedeem };
