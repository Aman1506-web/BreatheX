import { Week } from "./Weeks";

export function makePushPullWeeks(count: number): Week[] {
  return Array.from({ length: count }).map((_, i) => ({
    label: `Week ${i + 1}`,
    days: [
      { title: "Day 1 • Push 1 (Chest/Shoulders/Triceps)", meta: "30 mins • Full Body" },
      { title: "Day 2 • Pull 1 (Back/Biceps)",              meta: "30 mins • Full Body" },
      { title: "Day 4 • Push 2 (Chest/Shoulders/Triceps)",  meta: "30 mins • Full Body" },
      { title: "Day 5 • Pull 2 (Back/Biceps)",               meta: "30 mins • Full Body" },
    ],
  }));
}
