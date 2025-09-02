"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownUp, ExternalLink, UserPlus, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { mbtiToArchetype } from "@/app/data/personalityMap";
import { usePsychswap } from "@/app/hooks/usePsychSwap";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Avatar } from "@coinbase/onchainkit/identity";
import { useRouter } from "next/navigation";
import { useComposeCast } from "@coinbase/onchainkit/minikit";
export default function DashboardCards() {
  const { isConnected } = useAccount();
  const { myPersonality, isPersonalityLoading, savePersonality, isSaving } =
    usePsychswap();
  const router = useRouter();
  const { composeCast } = useComposeCast();
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-80 px-6 mt-10">
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl max-w-sm w-full">
          <Image
            src={"/base_icon.png"}
            width={50}
            height={50}
            alt="base icon"
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Wallet Required
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            To start swapping, please connect your wallet below.
          </p>

          <ConnectWallet className="px-5 py-3 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
            <Avatar className="h-6 w-6 rounded-full border border-white/30" />
            Connect Wallet
          </ConnectWallet>
        </div>
      </div>
    );
  }
  if (isPersonalityLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading your personality...</p>
      </div>
    );
  }

  if (!myPersonality) {
    // User has not registered their MBTI yet
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <UserPlus className="w-10 h-10 text-gray-400" />
        <p className="text-gray-600 text-center">
          You haven’t chosen your personality yet.
        </p>
        <p className="text-gray-600 text-center">
          Take Test / Choose Personality
        </p>
      </div>
    );
  }

  const archetype = mbtiToArchetype[myPersonality];
  const handleShare = async () => {
    try {
      const imageUrl = `${window.location.origin}${archetype.imagePath}`;
      await composeCast({
        text: `I just discovered my personality type: ${myPersonality} → ${archetype.name}! 🚀
Take the test and see yours 👇`,
        embeds: [imageUrl],
      });
    } catch (err) {
      console.error("Cast share failed:", err);
    }
  };

  return (
    <main>
      <Card className="w-full max-w-md mx-auto flex flex-col bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 relative">
        {/* Card Header */}
        <CardHeader className="pt-6 px-6">
          <div className="flex gap-2">
            <Badge className="w-fit">{myPersonality}</Badge>
            <Badge
              className={`${
                archetype.riskLevel === "low"
                  ? "bg-green-500 text-white"
                  : archetype.riskLevel === "medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
              } px-3 py-1 w-fit`}
            >
              {"Risk Level: " + archetype.riskLevel.toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <span className="text-2xl">{archetype.icon}</span>
            {archetype.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {archetype.description}
          </CardDescription>
        </CardHeader>

        {/* Image */}
        <CardContent className="px-6 pt-2">
          <div className="relative w-full h-72 rounded-xl">
            <Image
              src={archetype.imagePath}
              alt={archetype.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </CardContent>

        {/* Footer Buttons */}
        <CardFooter className="flex gap-3 px-6 pb-6 mt-auto">
          <Button
            className="flex-1"
            disabled={isSaving}
            onClick={() => router.push("/swap")}
          >
            <ArrowDownUp /> Start Swapping
          </Button>
          <Button className="flex-1" onClick={handleShare}>
            <ExternalLink /> Share
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
