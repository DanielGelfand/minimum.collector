const {ethers} = require("ethers");
const {bondOrStake} = require("../utils/bondOrStake.js")
const {strats} = require('../data/strats.js');
const {canRebase} = require("../utils/checkRebase.js");

const provider = ethers.getDefaultProvider("https://rpc.ftm.tools/");


const run = async () => {

    for (let i = 0; i < strats.length; i++) {
        strat = strats[i];

        let stakingAddress = strat["stakingContract"];
        let stakingABI = strat["stakingContractABI"].abi;
        let stakingContract = new ethers.Contract(stakingAddress, stakingABI, provider);

        let currBlockNum = await provider.getBlockNumber()
        if (await canRebase(currBlockNum, stakingContract)) {
            console.log("Can rebase!");
        }
        else {
            console.log("Cannot rebase");
        }

        checkOptimal = await bondOrStake(strat);
        
        if (checkOptimal) {
            console.log(checkOptimal);
            console.log("Checking if bond available...")
            // Get SpartacusStrategy Contract and check if bonded variable is True
            // If False, unstake funds and bond
        }
        else {
            console.log("Continue staking...");
        }

    }
}

(async () => {
    await run();
})();