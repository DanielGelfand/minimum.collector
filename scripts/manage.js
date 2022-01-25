const {ethers} = require("ethers");
const {bondOrStake} = require("../utils/bondOrStake.js")
const {strats} = require('../data/strats.js');
const {canRedeem} = require("../utils/checkRebase.js");

const provider = ethers.getDefaultProvider("https://rpc.testnet.fantom.network/");

// Function to be called repeatedly to check if bond can be redeemed and
// funds moved from staking to bonding
const run = async () => {

    let isBonding = false; // modify later to check in smart contract

    for (let i = 0; i < strats.length; i++) {
        if (i==0) continue;
        let strat = strats[i];
        let stratContract = new ethers.Contract(strat["stratAddress"], strat["stratABI"].abi, provider);
        let is44 = strat["is44"];

        let stakingAddress = strat["stakingContract"];
        let stakingABI = strat["stakingContractABI"].abi;

        let stakingContract = new ethers.Contract(stakingAddress, stakingABI, provider);

        if (isBonding) {
            let bondAddress = "0x5D449738986ab34280373502031D1513581Cb649"; // read currentBond
            let bond = grabBondWithAddress(strat,bondAddress)
            let bondABI = bond["bondABI"].abi;
            let bondContract = new ethers.Contract(bondAddress, bondABI, provider);

            let currBlockNum = await provider.getBlockNumber()
            if (isBonding && await canRedeem(currBlockNum, stakingContract, bondContract, is44)) {
                console.log("Can redeem bond!");
                // redeem bond here
            }
            else console.log("Cant redeem bond currently", currBlockNum);
        }   
        else {
            console.log("Currently not bonding");
        }

        let stakeToBond = await bondOrStake(strat);
        
        if (stakeToBond) {
            console.log(stakeToBond);
            console.log("Checking if allowed to bond...")
            // Get SpartacusStrategy Contract and check if bonded variable is True
            // If False, stakeToBond
            let isLP = stakeToBond["bondToken"].include("-")
            let token0Route = bond["token0Route"];
            let token1Route = bond["token1Route"];
            // if (isLP) { stratContract.stakeToBondLPAll(bondContract, token0Route, token1Route); }
            // else { stratContract.stakeToBondSingleAll(bondContract, token0Route); }
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