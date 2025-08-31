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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { mbtiToArchetype } from "@/app/data/personalityMap";
import { ArrowDownUp, ExternalLink } from "lucide-react";

export default function DashboardCards() {
  return (
    <main>
      <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {Object.entries(mbtiToArchetype).map(([mbti, archetype]) => (
            <CarouselItem key={mbti}>
              <Card className="w-full h-full flex flex-col bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 relative">
                {/* Card Header */}
                <CardHeader className="pt-6 px-6">
                  <div className="flex gap-2">
                    <Badge className="w-fit">{mbti}</Badge>
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
                      className="object-cover"
                    />
                  </div>
                </CardContent>

                {/* Footer Buttons */}
                <CardFooter className="flex gap-3 px-6 pb-6 mt-auto">
                  <Button className="flex-1">
                    {" "}
                    <ArrowDownUp /> Start Swapping
                  </Button>
                  <Button className="flex-1">
                    {" "}
                    <ExternalLink /> Share
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
