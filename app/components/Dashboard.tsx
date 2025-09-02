"use client";

import { Button } from "@/components/ui/button";
import PersonalityCards from "./PersonalityCards";
import { BookOpen, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import DashboardCards from "./DashboardCards";
type DashboardProps = {
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ setActiveTab }: DashboardProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-4xl font-normal">
        Swap based on your personality! Don't get FOMO'ed
      </h1>
      <div className="flex gap-3 w-full">
        <Button onClick={() => setOpen(true)} className="w-1/2">
          <User className="mr-2 h-4 w-4" />
          Choose Personality
        </Button>
        <Button onClick={() => router.push("/quiz")} className="w-1/2">
          <BookOpen size={20} className="text-black" /> Take a Test
        </Button>
      </div>
      <h1 className="text-2xl font-semibold">Your Personality</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-md rounded-2xl sm:rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Select Your Personality
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Pick a personality type to explore tailored strategies.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <PersonalityCards />
          </div>
        </DialogContent>
      </Dialog>

      <div id="personality-card">
        <DashboardCards />
      </div>
    </div>
  );
}
