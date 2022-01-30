const { convertSymbolTokenMapToAddressTokenMap } = require('blockchain-addressbook/build/util/convertSymbolTokenMapToAddressTokenMap');
const { Contract, utils, providers, ethers } = require('ethers');
const {Trade, Route, CurrencyAmount, TradeType, Currency, Pair, Token, TokenAmount, ChainId, Percent} = require('@ac32/spookyswap-sdk');

const poolAbi =  [
            {"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},
            {"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
            {"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
        ];

const constructToken = (tokenAddress, decimals) => {
    return new Token(ChainId.MAINNET, tokenAddress, decimals, "", "");
}


const calculatePriceImpact = async (rebaseTokenAddr, amountIn, pairAddresses, route) => {

    let provider = new ethers.getDefaultProvider("https://rpc.ftm.tools/");

    let router = new Contract(
        "0xF491e7B69E4244ad4002BC14e878a34207E38c29",
        ["function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"],
        provider
    )

    const pairs = []
    for(const pairAddress of pairAddresses) {

        let poolContract = new Contract(
            pairAddress,
            poolAbi,
            provider
        );

        let reserves = await poolContract.getReserves();
        let token0Address = await poolContract.token0();
        let token1Address = await poolContract.token1();

        token0 = constructToken(token0Address, utils.getAddress(rebaseTokenAddr) == token0Address ? 9 : 18);
        token1 = constructToken(token1Address, utils.getAddress(rebaseTokenAddr) == token1Address ? 9 : 18);

        pairs.push(new Pair(
            new TokenAmount(token0, reserves._reserve0),
            new TokenAmount(token1, reserves._reserve1))
        )
    }

    let tokenIn = constructToken(route[0], 9);
    let tokenOut = constructToken(route.at(-1), 18);
    let routeSpooky = new Route(pairs, tokenIn, tokenOut);

    console.log("Mid price:", routeSpooky.midPrice.toFixed(5));
    
    let trade = new Trade(routeSpooky, new TokenAmount(tokenIn, amountIn * 10e8), TradeType.EXACT_INPUT);

    console.log("Execution Price:", trade.executionPrice.toFixed(2));
    console.log("Input Amount:", trade.inputAmount.toFixed(2));
    console.log("Output Amount:", trade.outputAmount.toFixed(2));
    const priceImpactWithFee = trade.priceImpact
    ? new Percent(trade.priceImpact?.numerator, trade.priceImpact?.denominator)
    : undefined;
    console.log("Price impact:",priceImpactWithFee.toFixed(2));

    return priceImpactWithFee.toFixed(2);
    
}

(async () => {
    console.log("Price Impact FHM->DAI:", await calculatePriceImpact(
        "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
        1500,
        ["0xd77fc9c4074b56ecf80009744391942fbfddd88b"],
        ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286", "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"])
    )

    console.log();

    console.log("Price Impact FHM->MIM:", await calculatePriceImpact(
        "0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286",
        15000,
        ["0xd77fc9c4074b56ecf80009744391942fbfddd88b", "0xe120ffbda0d14f3bb6d6053e90e63c572a66a428", "0x6f86e65b255c9111109d2d2325ca2dfc82456efc"],
        ["0xfa1FBb8Ef55A4855E5688C0eE13aC3f202486286", "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e", "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83", "0x82f0B8B456c1A451378467398982d4834b6829c1"])
    )
})()