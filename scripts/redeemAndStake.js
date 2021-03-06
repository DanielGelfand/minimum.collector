const { ethers } = require("ethers");
const { strats } = require("../data/strats.js");
const { log } = require("../utils/logging");
require("dotenv").config({ path: `${__dirname}/.env` });

const run = async () => {
  const args = process.argv.slice(2);
  const targetStratId = args[0];
  const provider = ethers.getDefaultProvider("https://rpc.ftm.tools/");

  strategy = strats.find(({ id }) => {
    return id === targetStratId;
  });

  const signer = new ethers.Wallet(process.env.PK, provider);
  const stratContract = new ethers.Contract(
    strategy.address,
    strategy.abi,
    provider
  );
  const isBonding = await stratContract.isBonding();

  if (isBonding) {
    const targetBondAddress = await stratContract.currentBond();
    log(`Redeeming bond: ${targetBondAddress} for ${strategy.id}...`);

    await stratContract.connect(signer).redeemAndStake();
    log(`Redeeming bond: ${targetBondAddress} for ${strategy.id}`);
  } else {
    log(`${strategy.id} is currently not bonding`);
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
