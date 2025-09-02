import type { Token } from "@coinbase/onchainkit/token";

export const tokens: Token[] = [
  // Native ETH (Base network)
  {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image:
      "https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png",
  },

  // Core Wrapped Assets
  {
    address: "0x4200000000000000000000000000000000000006",
    chainId: 8453,
    decimals: 18,
    name: "Wrapped Ether",
    symbol: "WETH",
    image: "https://assets.coingecko.com/coins/images/2518/small/weth.png",
  },
  {
    address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    chainId: 8453,
    decimals: 8,
    name: "Coinbase Wrapped BTC",
    symbol: "cbBTC",
    image:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  },

  // Stablecoins
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    image:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
    chainId: 8453,
    decimals: 6,
    name: "Tether USD",
    symbol: "USDT",
    image:
      "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
  },
  {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    chainId: 8453,
    decimals: 18,
    name: "Dai Stablecoin",
    symbol: "DAI",
    image: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
  },

  // Liquid Staking Tokens
  {
    address: "0x2Ae3F1Ec7F1F5012CFEAb0185bfc7aa3cf0DEc22",
    chainId: 8453,
    decimals: 18,
    name: "Coinbase Wrapped Staked ETH",
    symbol: "cbETH",
    image: "https://assets.coingecko.com/coins/images/27008/small/cbeth.png",
  },
  {
    address: "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452",
    chainId: 8453,
    decimals: 18,
    name: "Wrapped liquid staked Ether 2.0",
    symbol: "wstETH",
    image: "https://assets.coingecko.com/coins/images/18834/small/wstETH.png",
  },

  // Base Ecosystem Tokens
  {
    address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    chainId: 8453,
    decimals: 18,
    name: "Aerodrome Finance",
    symbol: "AERO",
    image: "https://assets.coingecko.com/coins/images/31745/small/token.png",
  },
  {
    address: "0x4ed4E862860beD51a9570b96d89aF5E1b0Efefed",
    chainId: 8453,
    decimals: 18,
    name: "Degen",
    symbol: "DEGEN",
    image: "https://assets.coingecko.com/coins/images/34515/small/degen.png",
  },
  {
    address: "0x532f27101965dd16442689E3a1fc06116506d35A",
    chainId: 8453,
    decimals: 18,
    name: "Brett",
    symbol: "BRETT",
    image: "https://assets.coingecko.com/coins/images/30134/small/brett.png",
  },
  {
    address: "0xAC1Bd2486aAF3B5C0fc3Fd868558b082a531B2B4",
    chainId: 8453,
    decimals: 18,
    name: "Toshi",
    symbol: "TOSHI",
    image: "https://assets.coingecko.com/coins/images/31314/small/toshi.jpg",
  },

  // Additional DeFi Tokens
  {
    address: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
    chainId: 8453,
    decimals: 18,
    name: "BaseSwap Token",
    symbol: "BSWAP",
    image: "https://assets.coingecko.com/coins/images/30407/small/bswap.png",
  },
  {
    address: "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196",
    chainId: 8453,
    decimals: 18,
    name: "Extra Finance",
    symbol: "EXTRA",
    image: "https://assets.coingecko.com/coins/images/29942/small/extra.png",
  },
  {
    address: "0x1C7a460413dD4e964f96D8dFC56E7223cE88f7eC",
    chainId: 8453,
    decimals: 18,
    name: "Seamless Protocol",
    symbol: "SEAM",
    image:
      "https://assets.coingecko.com/coins/images/33054/small/SEAM_Logo_200x200.png",
  },

  // Major DeFi Tokens bridged to Base
  {
    address: "0xd07379a755A8f11B57610154861D694b2A0f615a",
    chainId: 8453,
    decimals: 18,
    name: "Compound",
    symbol: "COMP",
    image: "https://assets.coingecko.com/coins/images/10775/small/COMP.png",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    chainId: 8453,
    decimals: 18,
    name: "Uniswap",
    symbol: "UNI",
    image:
      "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  },
  {
    address: "0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842",
    chainId: 8453,
    decimals: 18,
    name: "Morpho",
    symbol: "MORPHO",
    image: "https://assets.coingecko.com/coins/images/31170/small/morpho.png",
  },
  {
    address: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
    chainId: 8453,
    decimals: 18,
    name: "Virtuals Protocol",
    symbol: "VIRTUAL",
    image: "https://assets.coingecko.com/coins/images/31669/small/virtuals.png",
  },

  // Additional stablecoins and wrapped assets
  {
    address: "0x417Ac0e078398C154EdFadD9Ef675d30Be60af93",
    chainId: 8453,
    decimals: 18,
    name: "Curve DAO Token",
    symbol: "CRV",
    image: "https://assets.coingecko.com/coins/images/12124/small/Curve.png",
  },
];
