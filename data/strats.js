const daiBondAbiSPA = require("../abi/bonds/DaiContract.json");
const wftmBondAbiSPA = require("../abi/bonds/WFTMContract.json");
const spa_daiBondAbiSPA = require("../abi/bonds/SpaDaiContract.json");
const spaStakingABI = require("../abi/SpartacusStaking.json");
const spaStratABI = require("../abi/SpaStrategy.json");

const fhmStakingABI = require("../abi/FantohmTestStaking.json");

const strats = [
  {
    name: "ftm-spartacus",
    address: "0x3468619ec0072b3a61CC38FA68c55c2Cc62b012C",
    abi: spaStratABI,
    platformToken: "spartacus",
    platformTokenAddress: "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc",
    stakingContract: "0x9863056B4Bdb32160A70107a6797dD06B56E8137",
    stakingContractABI: spaStakingABI,
    stakedTokenContract: "0x8e2549225E21B1Da105563D419d5689b80343E01",
    chainId: 250,
    usdPriceLP: "0xfa5a5f0bc990be1d095c5385fff6516f6e03c0a7",
    protocolTokenFirst: true,
    bonds: [
      {
        name: "dai",
        bondToken: "DAI",
        address: "0x5D449738986ab34280373502031D1513581Cb649",
        token0Route: [
          "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc",
          "0x5D449738986ab34280373502031D1513581Cb649",
        ],
        abi: daiBondAbiSPA.abi,
        is44: false,
      },
      {
        name: "wftm",
        bondToken: "WFTM",
        address: "0x7e1faf28a0ed1a736765d29ed9a985a4d921e1d4",
        token0Route: [
          "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc",
          "0x7e1faf28a0ed1a736765d29ed9a985a4d921e1d4",
        ],
        abi: wftmBondAbiSPA.abi,
        is44: false,
      },
      {
        name: "spa-dai",
        bondToken: "SPA-DAI",
        address: "0x8927a01AcBb4820f848711e2B7353d62172053b9",
        token0Route: ["0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc"],
        token1Route: [
          "0x5602df4A94eB6C680190ACCFA2A475621E0ddBdc",
          "0x8927a01AcBb4820f848711e2B7353d62172053b9",
        ],
        abi: spa_daiBondAbiSPA.abi,
        is44: false,
      },
    ],
  },
  {
    name: "ftmtest-fantohm",
    address: "0x8d72cfF3e847Af18CB91d225732aCED9d215493c", // update after deployment
    abi: spaStratABI,
    platformToken: "fantohm",
    platformTokenAddress: "0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2",
    stakingContract: "0x1cED6A6253388A56759da72F16D16544577D4dB7",
    stakingContractABI: fhmStakingABI,
    stakedTokenContract: "0x892bca2C0c2C2B244a43289885732a356Fde84cE",
    chainId: 4002,
    usdPriceLP: "",
    protocolTokenFirst: false,
    bonds: [
      {
        name: "dai",
        bondToken: "DAI",
        address: "0x74999396c2504A2926E75088899460AF51FCAFdF",
        token0Route: [
          "0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2",
          "0x05db87C4Cbb198717F590AabA613cdD2180483Ce",
        ],
        abi: daiBondAbiSPA.abi,
        is44: true,
      },
      {
        name: "mim",
        bondToken: "MIM",
        address: "0x6307251Cf95ac2373EDf3838e349c7C25Ccd1204",
        token0Route: [
          "0x4B209fd2826e6880e9605DCAF5F8dB0C2296D6d2",
          "0xFE2A3Da01681BD281cc77771c985CD7c4E372755",
        ],
        abi: daiBondAbiSPA.abi,
        is44: true,
      },
    ],
  },
  {
    name: "ftm-fantohm",
    id: "ftm-fantohm-01",
    address: "0x2e945c73E06e58B63a7DD9F605951fFD4fa3974d",
    abi: spaStratABI.abi,
    platformToken: "fantohm",
    platformTokenAddress: "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
    stakingContract: "0xcb9297425C889A7CbBaa5d3DB97bAb4Ea54829c2",
    stakingContractABI: fhmStakingABI,
    stakedTokenContract: "0x5E983ff70DE345de15DbDCf0529640F14446cDfa",
    chainId: 250,
    usdPriceLP: "0x46622913cE40c54Ec14857f72968d4BAAF963947",
    protocolTokenFirst: false,
    bonds: [
      {
        name: "dai",
        bondToken: "DAI",
        pairAddress: ["0xd77fc9c4074b56ecf80009744391942fbfddd88b"],
        address: "0xA6E6e8720C70f4715a34783381d6745a7aC32652",
        token0Route: [
          "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
          "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
        ],
        abi: daiBondAbiSPA.abi,
        is44: false,
        isLp: false,
      },
      {
        name: "fhm-dai",
        bondToken: "FHM-DAI",
        pairAddress: ["0xd77fc9c4074b56ecf80009744391942fbfddd88b"],
        address: "0x485C6b492B733f65d0f834e3Aa16dcD10d4DabE8",
        token0Route: ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286"],
        token1Route: [
          "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
          "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
        ],
        abi: spa_daiBondAbiSPA.abi,
        is44: false,
        isLp: true,
      },
    ],
  },
];

module.exports = { strats };
