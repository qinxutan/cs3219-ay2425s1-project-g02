export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export enum Topic {
  Array = "Array",
  Strings = "Strings",
  LinkedLists = "Linked Lists",
  Stacks = "Stacks",
  Queues = "Queues",
  Hashing = "Hashing",
  Trees = "Trees",
  Heaps = "Heaps",
  Graphs = "Graphs",
  DynamicProgramming = "Dynamic Programming",
  Recursion = "Recursion",
  Greedy = "Greedy",
  BitManipulation = "Bit Manipulation",
  Math = "Math",
}

export type Question = {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  difficulty: Difficulty;
  dateCreated: string;
};
