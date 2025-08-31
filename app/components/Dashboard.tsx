"use client";

import { Button } from "@/components/ui/button";
import PersonalityCards from "./PersonalityCards";
import { BookOpen, User } from "lucide-react";
import { useRouter } from "next/navigation";

type DashboardProps = {
  setActiveTab: (tab: string) => void;
};

export function Dashboard({ setActiveTab }: DashboardProps) {
  const router = useRouter();
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-5xl font-normal">
        Swap based on your personality! Don't get FOMO'ed
      </h1>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            const element = document.getElementById("personality-card");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <User /> Choose Personality
        </Button>
        <Button onClick={() => router.push("/quiz")}>
          <BookOpen size={20} className="text-black" /> Take a Test
        </Button>
      </div>

      <div id="personality-card">
        <PersonalityCards />
      </div>

      {/* <Card title="My First Mini App">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          This is a minimalistic Mini App built with OnchainKit components.
        </p>
        <Button
          onClick={() => setActiveTab("features")}
          icon={<Icon name="arrow-right" size="sm" />}
        >
          Explore Features
        </Button>
      </Card>

      <TodoList />

      <TransactionCard /> */}
    </div>
  );
}
