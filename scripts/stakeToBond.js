const { ethers } = require("ethers");
const { shouldBond } = require("../utils/shouldBond");
const { strats } = require("../data/strats");

const run = async () => {
  const args = process.argv.slice(2);
  const targetStratId = args[0];
  const provider = ethers.getDefaultProvider("https://rpc.ftm.tools/");

  strategy = strats.find(({ id }) => {
    return id === targetStratId;
  });

  const stratContract = new ethers.Contract(
    strategy.address,
    strategy.abi,
    provider
  );
  const isBonding = await stratContract.isBonding();

  //if (isBonding) return;

  const rebaseBalance = Number(
    ethers.utils.formatUnits(await stratContract.availableRebaseToken(), 9)
  );

  const stakeToBondData = await shouldBond(provider, strategy, rebaseBalance);

  console.log(stakeToBondData);

  if (stakeToBondData.shouldBond) {
    console.log("Checking if are allowed to bond...");
    const token0Route = bond["token0Route"];
    const token1Route = bond["token1Route"];
    // if (stakeToBondData.isLP) { stratContract.stakeToBondLPAll(bondContract, token0Route, token1Route); }
    // else { stratContract.stakeToBondSingleAll(bondContract, token0Route); }
  } else {
    console.log("Continue staking...");
  }
};

if (require.main === module) {
  run()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
