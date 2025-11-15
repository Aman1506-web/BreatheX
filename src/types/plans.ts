export type Outline = {
  weeks: {
    label: string;
    days: {
      title: string;
      meta?: string;
    }[];
  }[];
};

export type PlanDayItem = {
  name: string;
  sets?: number;
  repsOrTime?: string;
  notes?: string;
};

export type PlanDayBlock = {
  type: string;
  items: PlanDayItem[];
};

export type PlanDay = {
  title?: string;
  focus?: string;
  blocks: PlanDayBlock[];
};