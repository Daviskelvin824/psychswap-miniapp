"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import toast from "react-hot-toast";
import { mbtiToArchetype } from "@/app/data/personalityMap";
import { ExternalLink, Save } from "lucide-react";
import { usePsychswap } from "../hooks/usePsychSwap";
import { useComposeCast } from "@coinbase/onchainkit/minikit";

export default function PersonalityCarousel() {
  const router = useRouter();
  const { savePersonality, isSaving, myPersonality } = usePsychswap();
  const { composeCast } = useComposeCast();
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
  const handleShare = async (mbti: string) => {
    if (!myPersonality) {
      toast.error("You need to save a personality before you can share!");
      return;
    }
    try {
      const imageUrl = `${window.location.origin}${mbtiToArchetype[mbti].imagePath}`;
      await composeCast({
        text: `I just discovered my personality type: ${mbti} → ${mbtiToArchetype[mbti].name}! 🚀
Take the test and see yours 👇\nhttps://farcaster.xyz/miniapps/2lasIRFKhdCj/psychswap`,
        embeds: [imageUrl],
      });
    } catch (err) {
      console.error("Cast share failed:", err);
    }
  };
  return (
    <main className="px-4 sm:px-10">
      <Carousel className="w-full max-w-72 mx-auto">
        <CarouselContent>
          {Object.entries(mbtiToArchetype).map(([mbti, archetype]) => (
            <CarouselItem key={mbti}>
              <Card className="flex flex-col bg-white shadow-md rounded-2xl border overflow-hidden">
                {/* Header */}
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{mbti}</Badge>
                    <Badge
                      className={`${
                        archetype.riskLevel === "low"
                          ? "bg-green-500 text-white"
                          : archetype.riskLevel === "medium"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      Risk: {archetype.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-2xl">{archetype.icon}</span>
                    {archetype.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {archetype.description}
                  </CardDescription>
                </CardHeader>

                {/* Image */}
                <CardContent className="relative w-full h-64 sm:h-64">
                  <Image
                    src={archetype.imagePath}
                    alt={archetype.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex gap-3 mt-10">
                  <Button
                    className="flex-1 flex items-center gap-2"
                    onClick={() => handleSaveAndSwap(mbti)}
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    className="flex-1 flex items-center gap-2"
                    onClick={() => handleShare(mbti)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
