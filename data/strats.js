const daiBondAbiSPA = require("../abi/bonds/DaiContract.json");
const wftmBondAbiSPA = require("../abi/bonds/WFTMContract.json");
const spa_daiBondAbiSPA = require("../abi/bonds/SpaDaiContract.json");
const spaStakingABI = require("../abi/SpartacusStaking.json");
const spaStratABI = require("../abi/SpaStrategy.json");

const fhmStakingABI = require("../abi/FantohmTestStaking.json");


const strats = [
    {
      "name": "ftm-spartacus",
      "stratAddress": "0x3468619ec0072b3a61CC38FA68c55c2Cc62b012C",
      "stratABI": spaStratABI,
      "platformToken": "spartacus",
      "platformTokenAddress": "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc",
      "stakingContract": "0x9863056B4Bdb32160A70107a6797dD06B56E8137",
      "stakingContractABI": spaStakingABI,
      "stakedTokenContract": "0x8e2549225E21B1Da105563D419d5689b80343E01",
      "chainId": 250,
      "usdPriceLP": "0xfa5a5f0bc990be1d095c5385fff6516f6e03c0a7",
      "protocolTokenFirst": true,
      "bonds": [
        {
          "name": "dai",
          "bondToken": "DAI",
          "bondAddress": "0x5D449738986ab34280373502031D1513581Cb649",
          "token0Route": ["0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc", "0x5D449738986ab34280373502031D1513581Cb649"],
          "bondABI": daiBondAbiSPA,
          "is44": false,
        },
        {
          "name": "wftm",
          "bondToken": "WFTM",
          "bondAddress": "0x7e1faf28a0ed1a736765d29ed9a985a4d921e1d4",
          "token0Route": ["0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc", "0x7e1faf28a0ed1a736765d29ed9a985a4d921e1d4"],
          "bondABI": wftmBondAbiSPA,
          "is44": false,
        },
        {
          "name": "spa-dai",
          "bondToken": "SPA-DAI",
          "bondAddress": "0x8927a01AcBb4820f848711e2B7353d62172053b9",
          "token0Route": ["0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc"],
          "token1Route": ["0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc", "0x8927a01AcBb4820f848711e2B7353d62172053b9"],
          "bondABI": spa_daiBondAbiSPA,
          "is44": false,
        }
      ]
    },
    {
      "name": "ftmtest-fantohm",
      "stratAddress": "0x8d72cfF3e847Af18CB91d225732aCED9d215493c", // update after deployment
      "stratABI": spaStratABI,
      "platformToken": "fantohm",
      "platformTokenAddress": "0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2",
      "stakingContract": "0x1cED6A6253388A56759da72F16D16544577D4dB7",
      "stakingContractABI": fhmStakingABI,
      "stakedTokenContract": "0x892bca2C0c2C2B244a43289885732a356Fde84cE",
      "chainId": 4002,
      "usdPriceLP": "",
      "protocolTokenFirst": false,
      "bonds": [
        {
          "name": "dai",
          "bondToken": "DAI",
          "bondAddress": "0x74999396c2504A2926E75088899460AF51FCAFdF",
          "token0Route": ["0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2", "0x05db87C4Cbb198717F590AabA613cdD2180483Ce"],
          "bondABI": daiBondAbiSPA,
          "is44": true,
        },
        {
          "name": "mim",
          "bondToken": "MIM",
          "bondAddress": "0x6307251Cf95ac2373EDf3838e349c7C25Ccd1204",
          "token0Route": ["0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2", "0xFE2A3Da01681BD281cc77771c985CD7c4E372755"],
          "bondABI": daiBondAbiSPA,
          "is44": true,
        },
      ]
    },
    {
      "name": "ftm-fantohm",
      "stratAddress": "0x2e945c73E06e58B63a7DD9F605951fFD4fa3974d", // update after deployment
      "stratABI": spaStratABI,
      "platformToken": "fantohm",
      "platformTokenAddress": "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
      "stakingContract": "0xcb9297425C889A7CbBaa5d3DB97bAb4Ea54829c2",
      "stakingContractABI": fhmStakingABI,
      "stakedTokenContract": "0x5E983ff70DE345de15DbDCf0529640F14446cDfa",
      "chainId": 250,
      "usdPriceLP": "0x46622913cE40c54Ec14857f72968d4BAAF963947",
      "protocolTokenFirst": false,
      "bonds": [
        {
          "name": "dai",
          "bondToken": "DAI",
          "pairAddress": ["0xd77fc9c4074b56ecf80009744391942fbfddd88b"],
          "bondAddress": "0x462eEC9f8A067f13B5F8F7356D807FF7f0e28c68",
          "token0Route": ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286", "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"],
          "bondABI": daiBondAbiSPA,
          "is44": false,
        },
        {
          "name": "mim",
          "bondToken": "MIM",
          "pairAddress": ["0xd77fc9c4074b56ecf80009744391942fbfddd88b", "0x484237bc35ca671302d19694c66d617142fbc235", "0x3c9ad6268065e425085f11ab8ea803973be6bcf3"],
          "bondAddress": "0x3C1a9b5Ff3196C43BcB05Bf1B7467fbA8e07EE61",
          // FHM->DAI->USDC->MIM
          "token0Route": ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286", "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", "0x04068da6c83afcfa0e13ba15a6696662335d5b75", "0x82f0B8B456c1A451378467398982d4834b6829c1"],
          "bondABI": daiBondAbiSPA,
          "is44": false,
        },
        {
          "name": "fhm-dai",
          "bondToken": "FHM-DAI",
          "pairAddress": ["0xd77fc9c4074b56ecf80009744391942fbfddd88b"],
          "bondAddress": "0x71976906ad5520a1CB23fd40b40437c1A2640bcd",
          "token0Route": ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286"],
          "token1Route": ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286", "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"],
          "bondABI": spa_daiBondAbiSPA,
          "is44": false,
        }
      ]
    },
]

module.exports = {strats};