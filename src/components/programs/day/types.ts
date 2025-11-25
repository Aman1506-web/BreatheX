export type ExerciseItem = {
  name: string;
  sets?: number;
  reps?: string;       // "10-12" or "30s"
  time?: string;       // alternative to reps
  rest?: string;       // "60s"
  tempo?: string;      // "2-1-2"p
  notes?: string;
};

export type DayBlock =
  | { type: "warmup"; title?: string; items: ExerciseItem[] }
  | { type: "main"; title?: string; items: ExerciseItem[] }
  | { type: "finisher"; title?: string; items: ExerciseItem[] }
  | { type: "pranayama"; title?: string; items: ExerciseItem[] }
  | { type: "cooldown"; title?: string; items: ExerciseItem[] };

export type DayMeta = {
  dayTitle: string;           // "Week 1 • Day 1"
  planTitle: string;          // "Muscle Gain • Beginner"
  focus: string | undefined;              // "Push 1 — Chest/Shoulders/Triceps"
  duration: string;           // "30 mins"
  equipment?: string;         // "Bodyweight + optional DBs"
};
