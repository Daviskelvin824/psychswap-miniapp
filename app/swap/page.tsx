"use client";
import { Avatar } from "@coinbase/onchainkit/identity";
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
import {
  useComposeCast,
  useMiniKit,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { mbtiToArchetype } from "@/app/data/personalityMap";
import { BookOpen, User, UserPlus } from "lucide-react";
import Image from "next/image";
import { tokens } from "../data/swapTokens";
import { usePsychswap } from "../hooks/usePsychSwap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SiFarcaster, SiX } from "react-icons/si";

export default function SwapInterface() {
  const { address } = useAccount();
  const { myPersonality, isPersonalityLoading } = usePsychswap();
  const { setFrameReady, isFrameReady } = useMiniKit();
  const router = useRouter();
  const openUrl = useOpenUrl();
  const { composeCast } = useComposeCast();
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  if (isPersonalityLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading your personality...</p>
      </div>
    );
  }

  const archetype = myPersonality ? mbtiToArchetype[myPersonality] : null;
  const recommendedTokens =
    archetype && Array.isArray(archetype.tokens)
      ? tokens.filter((token) => archetype.tokens.includes(token.symbol))
      : [];

  const handleShare = async () => {
    try {
      const imageUrl = `${window.location.origin}${archetype.imagePath}`;
      await composeCast({
        text: `I just discovered my personality type: ${myPersonality} → ${archetype.name}! 🚀
Take the test and see yours 👇\nhttps://farcaster.xyz/miniapps/2lasIRFKhdCj/psychswap`,
        embeds: [imageUrl],
      });
    } catch (err) {
      console.error("Cast share failed:", err);
    }
  };

  const handleShareOnX = (mbti: string) => {
    const archetype = mbtiToArchetype[mbti];

    const text = encodeURIComponent(
      `I just discovered my personality type: ${mbti} → ${archetype.name}! 🚀
  Take the test and see yours 👇\nhttps://farcaster.xyz/miniapps/2lasIRFKhdCj/psychswap`,
    );

    const url = `https://twitter.com/intent/tweet?text=${text}`;

    // ✅ Open inside Farcaster Mini App (preferred)
    openUrl(url);

    // or fallback if not inside Farcaster
    // window.open(url, "_blank");
  };

  return address ? (
    <main className="mt-10">
      <Swap title="PsychSwap" className="bg-white text-black">
        {/* ... Swap components remain the same ... */}
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
        {myPersonality ? (
          archetype ? (
            <Card className="mt-4 ">
              <CardHeader>
                <p className="text-sm text-black mb-2">
                  Based on your personality:{" "}
                  <strong className="text-white">{myPersonality}</strong>
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={archetype.imagePath}
                    alt={`${archetype.name} logo`}
                    width={60}
                    height={60}
                    className="rounded-full bg-white/10 p-1"
                  />
                  <div className="flex-1">
                    <CardTitle>
                      {archetype.name} ({archetype.icon})
                    </CardTitle>
                    <CardDescription className="text-gray-600 pt-1">
                      {archetype.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {recommendedTokens.length > 0 && (
                  <div className="mt-2 space-y-3">
                    <h4 className="font-semibold text-black">
                      Recommended Tokens:
                    </h4>
                    {recommendedTokens.map((token) => (
                      <div
                        key={token.address}
                        className="p-3 border bg-white text-black rounded-2xl flex items-center gap-4"
                      >
                        {token.image ? (
                          <Image
                            src={token.image}
                            alt={`${token.name} logo`}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center  text-[10px] font-bold">
                            {token.symbol.substring(0, 3)}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold ">
                            {token.name} ({token.symbol})
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-3 justify-center mt-5">
                  <Button
                    size="lg"
                    className="w-full border-1 bg-purple-400  text-white"
                    onClick={handleShare}
                  >
                    <SiFarcaster /> Cast on Farcaster
                  </Button>
                  <Button
                    size="lg"
                    className="w-full border-1 bg-black text-white"
                    onClick={() => handleShareOnX(myPersonality)}
                  >
                    <SiX /> Share on X
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Could not load a recommendation for your personality type.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <UserPlus className="w-10 h-10 text-gray-400" />
            <p className="text-gray-600 text-center">
              You haven’t chosen your personality yet.
            </p>

            <Button onClick={() => router.push("/quiz")} className="">
              <BookOpen size={20} className="text-black" /> Take a Test
            </Button>
          </div>
        )}
      </div>
    </main>
  ) : (
    <div className="flex flex-col items-center justify-center h-80 px-6 mt-10">
      {/* ... Connect Wallet component remains the same ... */}
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
