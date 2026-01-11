// src/app/programs/students/page.tsx
import ProgramsHero from "@/components/programs/ProgramsHero";
import InfoAlert from "@/components/programs/InfoAlert";
import PillarsInfoGrid from "@/components/programs/PillarsInfoGrid";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import Footer from "@/components/Footer";

import {
  Dumbbell,
  HeartPulse,
  Wind,
  BookOpenCheck,
  Brain,
  Timer,
} from "lucide-react";

import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
// NOTE: relative path from src/app/programs/students → project root /convex
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";


export default async function StudentsPage() {
  const plans = await fetchQuery(api.plans.getPlansByCategory, {
    category: "students",
  });

  return (
    <main className="min-h-screen">
      {/* 1) HERO */}
      <ProgramsHero
        title="Study Smarter. Train Stronger."
        subtext="Low-Stress workouts + 10-min pranayama for focus and recovery."
        leftImageSrc="/images/programs/hero/students-study.png"
        rightImageSrc="/images/programs/hero/students-gym.png"
        chips={[
          "⏱ 30-min sessions",
          "🧠 Focus & stress relief",
          "🏠 Minimal equipment",
        ]}
        divider="none"
        overlayStrength={1}
      />

      <section className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 space-y-6 sm:space-y-8">
        {/* 2) MEDICAL DISCLAIMER (RED) */}
        <InfoAlert
          tone="danger"
          title="Important: General Fitness Guidance"
          paragraphs={[
            "BreatheX plans are generalized fitness programs, not medical advice. If you have pain, injury, or a medical condition, please consult a doctor first.",
            "Our routines are experience-based and designed so a normal student can follow them comfortably.",
          ]}
        />

        {/* ⭐ FEATURED PLANS (Convex) */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            Featured Plans for Students
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl">
            Short, effective programs designed around study schedules.
          </p>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 pt-2">
            {plans.map((p) => (
              <Link
                key={p._id}
                href={`/programs/students/plans/${p.slug}`}
                className="group rounded-xl sm:rounded-2xl border bg-white overflow-hidden 
                           hover:shadow-lg hover:border-neutral-300
                           active:scale-[0.98] transition-all duration-200"
              >
                <div className="aspect-[4/3] sm:aspect-[16/9] bg-neutral-200 relative overflow-hidden">
                  <Image
                    src={p.heroImage || "/placeholder.jpg"}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold line-clamp-2 
                                 group-hover:text-neutral-700 transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-neutral-500 flex flex-wrap gap-x-2 gap-y-1">
                    <span className="whitespace-nowrap">{p.durationWeeks} weeks</span>
                    <span className="hidden xs:inline">•</span>
                    <span className="whitespace-nowrap">{p.workoutsPerWeek}x/week</span>
                    <span className="hidden xs:inline">•</span>
                    <span className="whitespace-nowrap">~{p.minutesPerWorkout} min</span>
                  </p>

                  <div className="pt-1">
                    <span className="inline-block text-[10px] sm:text-xs rounded-md 
                                   bg-black text-white px-2.5 py-1 font-medium
                                   tracking-wide">
                      {p.accessTier.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3) WHY BOX (icons + text) */}
        <PillarsInfoGrid
          heading="Why these pillars matter in a student's life"
          items={[
            {
              icon: <Dumbbell className="h-5 w-5" />,
              title: "Strength",
              text: "Better posture, injury-resistance, and confident movement. Short compound sets → long study hours feel easier.",
            },
            {
              icon: <HeartPulse className="h-5 w-5" />,
              title: "Cardio",
              text: "Improves stamina and brain blood-flow. You don't 'lose study time'—you gain focus and energy.",
            },
            {
              icon: <Wind className="h-5 w-5" />,
              title: "Pranayama",
              text: "Calms the nervous system, reduces anxiety, sharpens attention—perfect before/after study blocks.",
            },
            {
              icon: <BookOpenCheck className="h-5 w-5" />,
              title: "Diet Basics",
              text: "Steady energy with simple meals: protein, fiber, hydration. No heavy crash during revision.",
            },
            {
              icon: <Brain className="h-5 w-5" />,
              title: "Focus Routines",
              text: "Micro-workouts + breathing drills = sustained concentration during exam season.",
            },
            {
              icon: <Timer className="h-5 w-5" />,
              title: "Time-Smart",
              text: "30-minute sessions, hostel-friendly, minimal equipment. Consistency > intensity.",
            },
          ]}
        />

        {/* 4) EXPLORE (tabs + headings + two gray cards each) */}
        {/* <ExploreTabs
          tabs={[
            {
              key: "workouts",
              label: "Workouts",
              sections: [
                {
                  title: "Become Fit & Beat Stress/Anxiety",
                  cards: [
                    {
                      title: "Beginner • 5 days/week",
                      meta: "30-min, hostel-friendly",
                    },
                    {
                      title: "Intermediate • 5 days/week",
                      meta: "Strength + mobility",
                    },
                  ],
                },
                {
                  title: "Increase Running & Gain Muscle",
                  cards: [
                    {
                      title: "Hybrid Plan • 4 days/week",
                      meta: "2 run + 2 strength",
                    },
                    {
                      title: "Endurance Engine • 5 days/week",
                      meta: "Intervals + core",
                    },
                  ],
                },
                {
                  title: "Beat Exam Stress • Don't Compromise Muscle",
                  cards: [
                    {
                      title: "Low-stress Strength • 3 days/wk",
                      meta: "RPE 6–7, recovery first",
                    },
                    {
                      title: "Deload + Focus Block",
                      meta: "Exam week micro-workouts",
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
                  title: "Budget-Friendly Student Meals",
                  cards: [
                    {
                      title: "High-Protein Tiffin",
                      meta: "Egg/paneer + roti + salad",
                    },
                    { title: "Quick Hostel Kitchen", meta: "One-pan recipes" },
                  ],
                },
                {
                  title: "Stable Energy for Long Study",
                  cards: [
                    {
                      title: "Glycemic Control Plan",
                      meta: "Slow carbs + fiber",
                    },
                    { title: "Hydration & Electrolytes", meta: "Smart sips" },
                  ],
                },
                {
                  title: "Exam Week Fuel",
                  cards: [
                    { title: "Light & Sharp", meta: "No food coma" },
                    { title: "Night-Owl Routine", meta: "Late study snacks" },
                  ],
                },
              ],
            },
            {
              key: "pranayama",
              label: "Pranayama",
              sections: [
                {
                  title: "Focus & Calm",
                  cards: [
                    {
                      title: "10-min Daily Set",
                      meta: "Anulom Vilom + Udgeeth",
                    },
                    { title: "Pre-Study Boost", meta: "2-min reset drill" },
                  ],
                },
                {
                  title: "Stress Release",
                  cards: [
                    {
                      title: "Evening Unwind",
                      meta: "Bhramari + Box Breathing",
                    },
                    { title: "Exam Morning", meta: "Short energizer" },
                  ],
                },
                {
                  title: "Balance & Recovery",
                  cards: [
                    { title: "Sleep Prep", meta: "Slow nasal breathing" },
                    {
                      title: "Mobility + Breath",
                      meta: "Stretch + breath sync",
                    },
                  ],
                },
              ],
            },
          ]}
        /> */}

      </section>

      <MovingCommunityStrip />
      <Footer />
    </main>
  );
}
