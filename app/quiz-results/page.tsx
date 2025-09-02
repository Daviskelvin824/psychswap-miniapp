"use client";

import { use } from "react"; // 👈 import use()
import { mbtiToArchetype } from "@/app/data/personalityMap";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiFarcaster } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import {
  TrendingUp,
  Clock,
  Zap,
  Target,
  Coins,
  BarChart3,
  RefreshCw,
  ArrowRight,
  ArrowDownUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useComposeCast, useMiniKit } from "@coinbase/onchainkit/minikit";
import { usePsychswap } from "../hooks/usePsychSwap";
import { useRouter } from "next/navigation";

export default function QuizResultsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // ✅ unwrap the promise
  const searchParams = use(searchParamsPromise);
  const mbti = searchParams?.mbti
    ? Array.isArray(searchParams.mbti)
      ? searchParams.mbti[0].toUpperCase()
      : searchParams.mbti.toUpperCase()
    : null;

  const result = mbti ? mbtiToArchetype[mbti] : null;
  const { savePersonality, isSaving } = usePsychswap();
  const router = useRouter();
  const { setFrameReady, isFrameReady } = useMiniKit();
  const { composeCast } = useComposeCast();
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);
  const handleSaveAndSwap = async (mbti: string) => {
    try {
      const archetype = mbtiToArchetype[mbti];

      const formData = new FormData();
      formData.append("mbti", mbti);
      formData.append("name", archetype.name);
      formData.append("description", archetype.description);

      // fetch image from public folder
      const response = await fetch(archetype.imagePath || "/placeholder.png");
      const blob = await response.blob();
      formData.append(
        "image",
        new File([blob], `${mbti}.png`, { type: blob.type }),
      );

      // upload to Pinata
      const res = await fetch("/api/uploadToIPFS", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.uri) throw new Error("IPFS upload failed");

      // save to contract
      const ok = await savePersonality(mbti, data.uri);

      if (ok) {
        router.push("/swap");
      }
    } catch (err) {
      console.error("Save & Swap failed:", err);
    }
  };

  if (!mbti || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center text-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Invalid or missing MBTI type.
          </h1>
          <p className="text-gray-600 mb-6">
            It looks like there was an issue with your quiz results. Let’s get
            you back on track!
          </p>
          <Link href="/quiz/start">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Take the Quiz
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  const handleShare = async () => {
    try {
      const imageUrl = `${window.location.origin}${result.imagePath}`;
      await composeCast({
        text: `I just discovered my personality type: ${mbti} → ${result.name}! 🚀
Take the test and see yours 👇`,
        embeds: [imageUrl],
      });
    } catch (err) {
      console.error("Cast share failed:", err);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge className="rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
              {mbti}
            </Badge>
            <Badge
              className={`${
                result.riskLevel === "low"
                  ? "bg-green-500 text-black"
                  : result.riskLevel === "medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-black"
              } rounded-full px-5 py-2 text-sm font-semibold border-2 border-black shadow`}
            >
              {"Risk Level: " + result.riskLevel.toUpperCase()}
            </Badge>
          </div>

          {/* Avatar with glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full blur-2xl opacity-40 scale-110" />
            <div className="relative bg-white rounded-full p-4 shadow-xl">
              <Image
                src={result.imagePath || "/placeholder.svg"}
                width={260}
                height={260}
                alt={result.name}
                className="rounded-full"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mt-6">
            {result.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            {result.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg hover:scale-[1.02] transition">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 text-black rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Novelty Appetite
                </h3>
              </div>
              <p className="text-gray-700 font-medium text-base">
                {result.noveltyAppetite.toUpperCase()}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg hover:scale-[1.02] transition">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 text-black rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Holding Time
                </h3>
              </div>
              <p className="text-gray-700 font-medium text-base">
                {result.holdingTime.toUpperCase()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-gray-50 to-white border shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-xl flex items-center justify-center mr-4 shadow-md">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Strategy
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {result.strategy}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
            size="lg"
            className="w-full border-2 hover:bg-gray-100"
            onClick={() => handleSaveAndSwap(mbti)}
            disabled={isSaving}
          >
            <ArrowDownUp />
            {isSaving ? "Saving on chain..." : "Save & Swap"}
          </Button>

          <Link href="/quiz" className="w-full sm:flex-1">
            <Button size="lg" className="w-full border-2 hover:bg-gray-100">
              <RefreshCw className="w-5 h-5 mr-2" />
              Retake Quiz
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <Button
            size="lg"
            className="w-full border-1 bg-purple-400 shadow-purple-100 text-white"
            onClick={handleShare}
          >
            <SiFarcaster /> Share on Farcaster
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Your personality type guides your trading journey 🚀 Always do your
            own research before making decisions!
          </p>
        </div>
      </div>
    </div>
  );
}
