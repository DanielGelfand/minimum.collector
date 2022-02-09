const { ethers } = require("ethers");
const { bondOrStake } = require("../utils/bondOrStake.js");
const { strats } = require("../data/strats.js");
const { canRedeem } = require("../utils/checkRebase.js");
const {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Pair,
  TokenAmount,
} = require("@ac32/spookyswap-sdk");

// const DAI = new Token(
//   ChainId.FTMTESTNET,
//   "0x30a40bc648799a746947417c675e54d5915aca38",
//   18
// );

// const FTM = new Token(
//     ChainId.FTMTESTNET,
//     "0xfa743d3ea980ec8697d516097d77f91fa5561ebe",
//     18
//   );

const provider = ethers.getDefaultProvider("https://rpc.ftm.tools/");

// (async () => {
//     const pair = await Fetcher.fetchPairData(DAI, FTM, provider);
//     console.log(pair);
// })()

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option

// Function to be called repeatedly to check if bond can be redeemed and
// funds moved from staking to bonding
const run = async () => {
  for (let i = 0; i < strats.length; i++) {
    if (strats[i].name != "ftm-fantohm") continue;

    let strat = strats[i];
    let stratContract = new ethers.Contract(
      strat["stratAddress"],
      strat["stratABI"].abi,
      provider
    );
    let isBonding = await stratContract.isBonding();

    let stakingAddress = strat["stakingContract"];
    let stakingABI = strat["stakingContractABI"].abi;
    let stakingContract = new ethers.Contract(
      stakingAddress,
      stakingABI,
      provider
    );

    if (isBonding) {
      let bondAddress = await stratContract.currentBond(); // read currentBond
      let bond = grabBondWithAddress(strat, bondAddress);
      let bondABI = bond["bondABI"].abi;
      let bondContract = new ethers.Contract(bondAddress, bondABI, provider);
      let is44 = bond["is44"];
      console.log("Can redeem bond");
    } else {
      console.log(`Currently not bonding for ${strat.name}`);
    }

    // let stakeToBond = await bondOrStake(strat,1);

    // if (stakeToBond) { // if we should bond
    //     console.log(stakeToBond);
    //     console.log("Checking if allowed to bond...")
    //     let isLP = stakeToBond["bondToken"].include("-")
    //     let token0Route = bond["token0Route"];
    //     let token1Route = bond["token1Route"];
    //     // if (isLP) { stratContract.stakeToBondLPAll(bondContract, token0Route, token1Route); }
    //     // else { stratContract.stakeToBondSingleAll(bondContract, token0Route); }
    // }
    // else {
    //     console.log("Continue staking...");
    // }

    console.log();
  }
};

// Grabs the bond from a strategy object with the given bond address
const grabBondWithAddress = (strat, bondAddress) => {
  for (const bond of strat["bonds"]) {
    if (bond["bondAddress"] === bondAddress) {
      return bond;
    }
  }
  return null;
};

(async () => {
  await run();
})();
