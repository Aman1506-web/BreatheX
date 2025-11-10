"use client";

import ProgramsHero from "@/components/programs/ProgramsHero";
import InfoAlert from "@/components/programs/InfoAlert";
import PillarsInfoGrid from "@/components/programs/PillarsInfoGrid";
import ExploreTabs from "@/components/programs/ExploreTabs";

import {
  Dumbbell,
  HeartPulse,
  Wind,
  BookOpenCheck,
  Brain,
  Timer,
} from "lucide-react";

export default function HousewivesPage() {
  return (
    <main className="min-h-screen">
      {/* 1) HERO */}
      <ProgramsHero
        title="Stay Active at Home, Stay Strong for Family"
        subtext="Quick home workouts + pranayama for energy, mobility, and balanced health while managing daily responsibilities."
        leftImageSrc="/images/programs/hero/housewive-kitchen.png"
        rightImageSrc="/images/programs/hero/housewive-exercise.png"
        chips={[
          "💪 Home strength",
          "🧘 Mobility & calm",
          "⏱ 20–30 min sessions",
        ]}
        divider="none"
        overlayStrength={1}
      />

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
        {/* 2) MEDICAL DISCLAIMER */}
        <InfoAlert
          tone="danger"
          title="Important: General Fitness Guidance"
          paragraphs={[
            "BreatheX plans are generalized fitness programs, not medical advice. Please consult a doctor if you have pain, injury, or medical conditions.",
            "Our routines are designed from experience for safe, accessible practice at home.",
          ]}
        />

        {/* 3) WHY BOX */}
        <PillarsInfoGrid
          heading="Why fitness pillars matter for housewives"
          items={[
            {
              icon: <Dumbbell className="h-5 w-5" />,
              title: "Strength",
              text: "Helps with daily chores, prevents fatigue and back issues.",
            },
            {
              icon: <HeartPulse className="h-5 w-5" />,
              title: "Cardio",
              text: "Improves stamina, keeps energy high throughout the day.",
            },
            {
              icon: <Wind className="h-5 w-5" />,
              title: "Pranayama",
              text: "Calms mind, reduces stress, balances emotions.",
            },
            {
              icon: <BookOpenCheck className="h-5 w-5" />,
              title: "Diet Basics",
              text: "Quick and nutritious meals to support energy and family care.",
            },
            {
              icon: <Brain className="h-5 w-5" />,
              title: "Focus Routines",
              text: "Short mindful practices to recharge between tasks.",
            },
            {
              icon: <Timer className="h-5 w-5" />,
              title: "Time-Smart",
              text: "20–30 minute routines easily fit into household schedule.",
            },
          ]}
        />

        {/* 4) EXPLORE TABS */}
        <ExploreTabs
          tabs={[
            {
              key: "workouts",
              label: "Workouts",
              sections: [
                {
                  title: "Home Strength Starter",
                  cards: [
                    {
                      title: "Beginner • 3 days/week",
                      meta: "Bodyweight only",
                    },
                    {
                      title: "Intermediate • 4 days/week",
                      meta: "With resistance bands",
                    },
                  ],
                },
                {
                  title: "Flexibility & Mobility",
                  cards: [
                    {
                      title: "Daily 20-min Flow",
                      meta: "Stretch + core stability",
                    },
                    { title: "Joint Health Routine", meta: "Mobility drills" },
                  ],
                },
                {
                  title: "Balanced Wellness",
                  cards: [
                    {
                      title: "Full-body Tone",
                      meta: "Mix of cardio + strength",
                    },
                    {
                      title: "Low-impact Recovery",
                      meta: "Perfect for busy weeks",
                    },
                  ],
                },
              ],
            },
            {
              key: "diet",
              label: "Diet Plans",
              sections: [
                {
                  title: "Quick & Nutritious",
                  cards: [
                    { title: "15-min Meals", meta: "Protein + veggies" },
                    { title: "One-pot Recipes", meta: "Family-friendly" },
                  ],
                },
                {
                  title: "Energy Sustaining",
                  cards: [
                    {
                      title: "Balanced Plates",
                      meta: "Carbs + protein + fiber",
                    },
                    {
                      title: "Smart Snacking",
                      meta: "Healthy bites between tasks",
                    },
                  ],
                },
                {
                  title: "Family Wellness",
                  cards: [
                    { title: "Shared Meals", meta: "Nutritious for all" },
                    {
                      title: "Budget-Friendly Plan",
                      meta: "Simple, affordable ingredients",
                    },
                  ],
                },
              ],
            },
            {
              key: "pranayama",
              label: "Pranayama",
              sections: [
                {
                  title: "Stress Relief",
                  cards: [
                    { title: "Evening Calm", meta: "Bhramari + Anulom Vilom" },
                    { title: "Quick Reset", meta: "2-min breathing drill" },
                  ],
                },
                {
                  title: "Energy & Balance",
                  cards: [
                    {
                      title: "Morning Energizer",
                      meta: "Kapalbhati + Udgeeth",
                    },
                    { title: "Balance Flow", meta: "Breath + stretch combo" },
                  ],
                },
                {
                  title: "Focus & Relaxation",
                  cards: [
                    {
                      title: "Mind Reset",
                      meta: "Deep breathing + mindfulness",
                    },
                    { title: "Sleep Prep", meta: "Slow nasal breathing" },
                  ],
                },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}
