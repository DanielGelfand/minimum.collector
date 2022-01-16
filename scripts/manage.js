const {ethers} = require("ethers");
const {bondOrStake} = require("../utils/bondOrStake.js")
const {strats} = require('../data/strats.js');
const {canRedeem} = require("../utils/checkRebase.js");

const provider = ethers.getDefaultProvider("https://rpc.ftm.tools/");

// Function to be called repeatedly to check if bond can be redeemed and
// funds moved from staking to bonding
const run = async () => {

    let isBonding = true; // modify later to check in smart contract

    for (let i = 0; i < strats.length; i++) {
        strat = strats[i];
        let is44 = strat["is44"];

        let stakingAddress = strat["stakingContract"];
        let stakingABI = strat["stakingContractABI"].abi;

        let bondAddress = "0x5D449738986ab34280373502031D1513581Cb649"; // read currentBond
        let bondABI = grabBondWithAddress(strat,bondAddress)["bondABI"].abi;

        let stakingContract = new ethers.Contract(stakingAddress, stakingABI, provider);
        let bondContract = new ethers.Contract(bondAddress, bondABI, provider);

        let currBlockNum = await provider.getBlockNumber()
        if (isBonding && await canRedeem(currBlockNum, stakingContract, bondContract, is44)) {
            console.log("Can redeem bond!");
            // redeem bond here
        }
        else {
            console.log("Cannot redeem bond");
        }

        checkOptimal = await bondOrStake(strat);
        
        if (checkOptimal) {
            console.log(checkOptimal);
            console.log("Checking if bond available...")
            // Get SpartacusStrategy Contract and check if bonded variable is True
            // If False, stakeToBond
        }
        else {
            console.log("Continue staking...");
        }

    }
}

// Grabs the bond from a strategy object with the given address
const grabBondWithAddress = (strat, bondAddress) => {
    for (const bond of strat["bonds"]) {
        if (bond["bondAddress"] === bondAddress) {
            return bond
        }
    }
    return null;
}

(async () => {
    await run();
})();