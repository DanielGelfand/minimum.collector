const daiBondABI = require("../abi/bonds/DaiContract.json");
const wftmBondABI = require("../abi/bonds/WFTMContract.json");
const spa_daiBondABI = require("../abi/bonds/SpaDaiContract.json");

const strats = [
    {
      "name": "ftm-spartacus",
      "address": "placeholder",
      "platformToken": "spartacus",
      "stakingContract": "0x9863056B4Bdb32160A70107a6797dD06B56E8137",
      "stakedTokenContract": "0x8e2549225E21B1Da105563D419d5689b80343E01",
      "chainId": 250,
      "usdPriceLP": "0xfa5a5f0bc990be1d095c5385fff6516f6e03c0a7",
      "bonds": [
        {
          "name": "dai",
          "bondToken": "DAI",
          "bondAddress": "0x5D449738986ab34280373502031D1513581Cb649",
          "bondABI": daiBondABI,
        },
        {
          "name": "wftm",
          "bondToken": "WFTM",
          "bondAddress": "0x7e1faf28a0ed1a736765d29ed9a985a4d921e1d4",
          "bondABI": wftmBondABI,
        },
        {
          "name": "spa-dai",
          "bondToken": "SPA-DAI",
          "bondAddress": "0x8927a01AcBb4820f848711e2B7353d62172053b9",
          "bondABI": spa_daiBondABI,
        }
      ]
    }
]

module.exports = {strats};