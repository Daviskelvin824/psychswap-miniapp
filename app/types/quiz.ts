export type MBTITrait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface QuizChoice {
  label: string;
  value: number; // range from -2 to +2
  mbtiImpact: Partial<Record<MBTITrait, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  axis: [MBTITrait, MBTITrait]; // For scoring
  choices: QuizChoice[];
}
