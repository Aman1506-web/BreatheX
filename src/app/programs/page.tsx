"use client";

import ProgramsHeroTriptych from "@/components/programs/ProgramsHeroTriptych";
import InfoAlert from "@/components/programs/InfoAlert";
import PillarsInfoGrid from "@/components/programs/PillarsInfoGrid";
import CategoryCard from "@/components/programs/CategoryCard";
import CTASection from "@/components/programs/CTASection";

import { Dumbbell, HeartPulse, Wind, BookOpenCheck } from "lucide-react";

const categories = [
  { key: "students", title: "Students", emoji: "🎓", tagline: "Beat exam stress & stay fit", href: "/programs/students" },
  { key: "housewives", title: "Housewives", emoji: "🏠", tagline: "Stay active & energized at home", href: "/programs/housewives" },
  { key: "professionals", title: "Professionals", emoji: "💼", tagline: "Quick fitness for busy schedules", href: "/programs/professionals" },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      {/* 1) Triptych Hero with 3 vertical portraits */}
      <ProgramsHeroTriptych
  title="Curated Fitness Plans for Every Lifestyle"
  subtext="Students, homemakers, and working professionals — choose your path and build consistent, balanced health."
  portraits={[
    { src: "/images/programs/hero/professionals-portrait.png", alt: "Working professional training" },
    { src: "/images/programs/hero/students-portrait.png", alt: "Student practicing pranayama" },
    { src: "/images/programs/hero/housewives-portrait.png", alt: "Homemaker cooking and staying active" },
  ]}
  // turn this on only if you want very subtle background glows:
  // decorGlows
/>


      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 py-14 space-y-10">
        {/* 2) Global InfoAlert */}
        <InfoAlert
          tone="danger"
          title="General Fitness Disclaimer"
          paragraphs={[
            "All BreatheX programs are designed for general fitness, not medical treatment. Please consult a doctor if you have existing health conditions.",
            "Our goal is to make fitness accessible, safe, and effective for all lifestyles.",
          ]}
        />

        {/* 3) Pillars of Fitness */}
        <PillarsInfoGrid
          heading="The Four Pillars of Lasting Fitness"
          description="Every BreatheX plan combines these fundamentals to keep you consistent and progressing."
          items={[
            { icon: <Dumbbell className="h-5 w-5" />, title: "Strength", text: "Build muscle, improve posture, and handle daily challenges with ease." },
            { icon: <HeartPulse className="h-5 w-5" />, title: "Cardio", text: "Boost stamina, energy, and cardiovascular health for long-term vitality." },
            { icon: <Wind className="h-5 w-5" />, title: "Pranayama", text: "Reduce stress, sharpen focus, and balance the nervous system." },
            { icon: <BookOpenCheck className="h-5 w-5" />, title: "Diet Basics", text: "Fuel your body with balanced meals that support recovery and energy." },
          ]}
        />

        {/* 4) Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="categories">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              emoji={cat.emoji}
              title={cat.title}
              tagline={cat.tagline}
              href={cat.href}
            />
          ))}
        </div>
      </section>

      {/* 5) Closing CTA */}
      <CTASection
        title="⚡ Ready to Transform?"
        subtext="Choose your category or let GenX AI design a custom plan just for you."
        primary={{ label: "Explore Categories", href: "#categories" }}
        secondary={{ label: "Generate with AI", href: "/generate" }}
      />
    </main>
  );
}

