const ethers = require("ethers");
const {bondOrStake} = require("../utils/bondOrStake.js")
const { strats } = require('../data/strats.js');

const run = async () => {

    for (let i = 0; i < strats.length; i++) {
        strat = strats[i];
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