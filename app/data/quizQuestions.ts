import { QuizQuestion } from "../types/quiz";

const scale = [
  { label: "Strongly Disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly Agree", value: 2 },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "I get energy from social interactions.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { E: s.value },
    })),
  },
  {
    id: "q2",
    question: "I need time alone to recharge.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { I: s.value },
    })),
  },
  {
    id: "q3",
    question: "I prefer concrete facts over abstract ideas.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { S: s.value },
    })),
  },
  {
    id: "q4",
    question: "I trust my instincts and imagination.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { N: s.value },
    })),
  },
  {
    id: "q5",
    question: "I make decisions based on logic and reason.",
    axis: ["T", "F"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { T: s.value },
    })),
  },
  {
    id: "q6",
    question: "I consider people’s feelings in decision making.",
    axis: ["T", "F"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { F: s.value },
    })),
  },
  {
    id: "q7",
    question: "I prefer a planned and organized lifestyle.",
    axis: ["J", "P"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { J: s.value },
    })),
  },
  {
    id: "q8",
    question: "I like to keep my options open.",
    axis: ["J", "P"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { P: s.value },
    })),
  },
  {
    id: "q9",
    question: "I thrive in group discussions.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { E: s.value },
    })),
  },
  {
    id: "q10",
    question: "I often reflect deeply before speaking.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { I: s.value },
    })),
  },
  {
    id: "q11",
    question: "I notice details others might miss.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { S: s.value },
    })),
  },
  {
    id: "q12",
    question: "I enjoy exploring big ideas and theories.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { N: s.value },
    })),
  },
  {
    id: "q13",
    question: "Being fair is more important than being kind.",
    axis: ["T", "F"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { T: s.value },
    })),
  },
  {
    id: "q14",
    question: "I value empathy over objectivity.",
    axis: ["T", "F"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { F: s.value },
    })),
  },
  {
    id: "q15",
    question: "I like to finish tasks before relaxing.",
    axis: ["J", "P"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { J: s.value },
    })),
  },
  {
    id: "q16",
    question: "Deadlines are flexible as long as the work gets done.",
    axis: ["J", "P"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { P: s.value },
    })),
  },
  {
    id: "q17",
    question: "I prefer lively environments.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { E: s.value },
    })),
  },
  {
    id: "q18",
    question: "Too much social interaction drains me.",
    axis: ["E", "I"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { I: s.value },
    })),
  },
  {
    id: "q19",
    question: "I prefer practical solutions over idealistic ones.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { S: s.value },
    })),
  },
  {
    id: "q20",
    question: "I often think about future possibilities.",
    axis: ["S", "N"],
    choices: scale.map((s) => ({
      ...s,
      mbtiImpact: { N: s.value },
    })),
  },
];
