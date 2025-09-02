// src/app/lib/wagmi.ts
import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [base], // ✅ supports both Base Mainnet + Testnet
  connectors: [
    coinbaseWallet({
      appName: "PsychSwap MiniKit", // shows up in Coinbase Wallet UI
    }),
  ],
  transports: {
    [base.id]: http(`https://mainnet.base.org/`), // defaults to public RPC
    // [baseSepolia.id]: http(`https://sepolia.base.org`),
  },
  ssr: true, // ✅ enables Next.js SSR compatibility
});
