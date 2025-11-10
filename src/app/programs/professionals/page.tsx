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

export default function ProfessionalsPage() {
  return (
    <main className="min-h-screen">
      {/* 1) HERO */}
      <ProgramsHero
        title="Fitness for Busy Schedules"
        subtext="Quick 30-min workouts, stress-busting pranayama, and smart nutrition for long office days."
        leftImageSrc="/images/programs/hero/working-office.png"
        rightImageSrc="/images/programs/hero/working-gym.png"
        overlayStrength={1}
        chips={[
          "⏱ 30-min express",
          "🧘 Stress relief",
          "💻 Desk-health focused",
        ]}
        divider="none"
      />

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 py-10 space-y-8">
        {/* 2) MEDICAL DISCLAIMER */}
        <InfoAlert
          tone="danger"
          title="Important: General Fitness Guidance"
          paragraphs={[
            "BreatheX plans are generalized fitness programs, not medical advice. If you have pain, injury, or a medical condition, please consult a doctor first.",
            "Our programs are designed to be safe, effective, and time-efficient for busy professionals.",
          ]}
        />

        {/* 3) WHY BOX */}
        <PillarsInfoGrid
          heading="Why fitness pillars matter for professionals"
          items={[
            {
              icon: <Dumbbell className="h-5 w-5" />,
              title: "Strength",
              text: "Supports posture, prevents desk-related back pain, boosts confidence.",
            },
            {
              icon: <HeartPulse className="h-5 w-5" />,
              title: "Cardio",
              text: "Improves stamina and heart health, offsets sedentary office hours.",
            },
            {
              icon: <Wind className="h-5 w-5" />,
              title: "Pranayama",
              text: "Reduces workplace stress, sharpens focus for long meetings and deadlines.",
            },
            {
              icon: <BookOpenCheck className="h-5 w-5" />,
              title: "Diet Basics",
              text: "Keeps energy stable, avoids sugar crashes during workday.",
            },
            {
              icon: <Brain className="h-5 w-5" />,
              title: "Focus Routines",
              text: "Short resets between tasks enhance productivity and clarity.",
            },
            {
              icon: <Timer className="h-5 w-5" />,
              title: "Time-Smart",
              text: "Designed for 20–30 minute windows to fit a busy lifestyle.",
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
                  title: "Express Strength",
                  cards: [
                    {
                      title: "Full Body • 3 days/week",
                      meta: "30-min, office-friendly",
                    },
                    {
                      title: "Desk-Relief Routine",
                      meta: "Mobility + posture drills",
                    },
                  ],
                },
                {
                  title: "Cardio & Conditioning",
                  cards: [
                    {
                      title: "Hybrid Plan • 4 days/week",
                      meta: "2 strength + 2 cardio",
                    },
                    { title: "HIIT Express", meta: "20-min fat burn" },
                  ],
                },
                {
                  title: "Balanced Performance",
                  cards: [
                    {
                      title: "Strength + Yoga Mix",
                      meta: "For stress & energy",
                    },
                    {
                      title: "Weekend Warrior",
                      meta: "Longer 45-min sessions",
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
                  title: "Office Fuel",
                  cards: [
                    {
                      title: "High-Protein Lunches",
                      meta: "Keep energy stable",
                    },
                    { title: "Snack Smart", meta: "Healthy desk snacks" },
                  ],
                },
                {
                  title: "Energy Management",
                  cards: [
                    {
                      title: "Balanced Macros",
                      meta: "Carbs + protein + fiber",
                    },
                    {
                      title: "Hydration Hacks",
                      meta: "Electrolytes + water timing",
                    },
                  ],
                },
                {
                  title: "Travel-Friendly",
                  cards: [
                    { title: "On-the-Go Plan", meta: "Packable meals" },
                    { title: "Late-Night Work", meta: "Light dinners" },
                  ],
                },
              ],
            },
            {
              key: "pranayama",
              label: "Pranayama",
              sections: [
                {
                  title: "Stress Buster",
                  cards: [
                    {
                      title: "Office Break Reset",
                      meta: "Box breathing 5-min",
                    },
                    { title: "Deadline Calm", meta: "Bhramari for anxiety" },
                  ],
                },
                {
                  title: "Energy & Focus",
                  cards: [
                    {
                      title: "Morning Pranayama",
                      meta: "Kapalbhati + Anulom Vilom",
                    },
                    { title: "Pre-Meeting Drill", meta: "Quick focus reset" },
                  ],
                },
                {
                  title: "Recovery & Sleep",
                  cards: [
                    {
                      title: "Evening Wind-down",
                      meta: "Slow nasal breathing",
                    },
                    {
                      title: "Sleep Prep Routine",
                      meta: "Deep rhythmic breath",
                    },
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
