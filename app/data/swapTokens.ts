import type { Token } from "@coinbase/onchainkit/token";

export const tokens: Token[] = [
  // Core tokens
  {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image:
      "https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png",
  },
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    image:
      "https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2",
  },

  {
    address: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed",
    chainId: 8453,
    decimals: 18,
    name: "Degen",
    symbol: "DEGEN",
    image: "https://assets.coingecko.com/coins/images/33659/small/degen.png",
  },
  {
    address: "0x4cbb28fa381a9e028b2d3c41c3d203f5d1a6be76",
    chainId: 8453,
    decimals: 18,
    name: "BaseSwap Token",
    symbol: "BSWAP",
    image: "https://baseswap.fi/images/token-icons/bswap.png",
  },
  {
    address: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    chainId: 8453,
    decimals: 18,
    name: "Aerodrome",
    symbol: "AERO",
    image: "https://assets.coingecko.com/coins/images/31612/small/aero.png",
  },
  {
    address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
    chainId: 8453,
    decimals: 18,
    name: "cbETH",
    symbol: "cbETH",
    image: "https://dynamic-assets.coinbase.com/.../asset_icons/f0b1cb5f…png",
  },
  {
    address: "0x7658eEcE745e0c9507A614A5E33f2eB6Cd2084F9",
    chainId: 8453,
    decimals: 18,
    name: "Balancer",
    symbol: "BAL",
    image: "https://assets.coingecko.com/coins/images/11683/small/Balancer.png",
  },
  {
    address: "0x6fe14d3a59578a84aa54c384f6cced29a4fd9f2a",
    chainId: 8453,
    decimals: 18,
    name: "Chainlink",
    symbol: "LINK",
    image:
      "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    address: "0x2b5db0f9da11c1d419dbfcd2349d44fbed3fbf04",
    chainId: 8453,
    decimals: 18,
    name: "Wrapped BTC",
    symbol: "WBTC",
    image:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  },
];
