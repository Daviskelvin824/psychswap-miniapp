"use client";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Swap,
  SwapAmountInput,
  SwapButton,
  SwapMessage,
  SwapSettings,
  SwapSettingsSlippageDescription,
  SwapSettingsSlippageInput,
  SwapSettingsSlippageTitle,
  SwapToast,
  SwapToggleButton,
} from "@coinbase/onchainkit/swap";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import type { Token } from "@coinbase/onchainkit/token";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { color } from "@coinbase/onchainkit/theme";
import { WalletIcon } from "lucide-react";
import Image from "next/image";
import { tokens } from "../data/swapTokens";
export default function SwapInterface() {
  const { address } = useAccount();
  const { setFrameReady, isFrameReady } = useMiniKit();
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return address ? (
    <main className="mt-10">
      <Swap title="PsychSwap" className="bg-white text-black">
        <SwapSettings>
          <SwapSettingsSlippageTitle>Max. slippage</SwapSettingsSlippageTitle>
          <SwapSettingsSlippageDescription>
            Your swap will revert if the prices change by more than the selected
            percentage.
          </SwapSettingsSlippageDescription>
          <SwapSettingsSlippageInput />
        </SwapSettings>
        <SwapAmountInput
          label="Sell"
          swappableTokens={tokens}
          token={tokens[0]}
          type="from"
          className=""
        />
        <SwapToggleButton className="border-2 border-white" />
        <SwapAmountInput
          label="Buy"
          swappableTokens={tokens}
          token={tokens[1]}
          type="to"
          className=""
        />
        <SwapButton className="bg-orange-300" />
        <SwapMessage />
        <SwapToast />
      </Swap>

      <div className="px-5 mt-5">
        <h1 className="text-xl font-semibold">Token recommendation</h1>
      </div>
    </main>
  ) : (
    <div className="flex flex-col items-center justify-center h-80 px-6 mt-10">
      <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl max-w-sm w-full">
        <Image src={"/base_icon.png"} width={50} height={50} alt="base icon" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Wallet Required
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
          To start swapping, please connect your wallet below.
        </p>
        <Wallet>
          <ConnectWallet className="px-5 py-3 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
            <Avatar className="h-6 w-6 rounded-full border border-white/30" />
            Connect Wallet
          </ConnectWallet>
        </Wallet>
      </div>
    </div>
  );
}
