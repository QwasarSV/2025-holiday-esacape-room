// Simple hash function to hide answers from source code inspection
export const hashAnswer = (answer: string): string => {
  const normalized = answer.toUpperCase().trim();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Pre-computed hashes for the answers
export const ANSWER_HASHES = {
  question1: "-pg0jwu",
  question2: "121gnl",
  question3: "ohprv7",
  question4: "wnrx7g",
  question5: "m03xm5",
  question6: "1fh9k",
  question7: "-eji09k",
  question8: "xsgb6p",
  question9: "t3wm3y",
};

export const checkAnswer = (userAnswer: string, questionKey: keyof typeof ANSWER_HASHES): boolean => {
  const userHash = hashAnswer(userAnswer);
  return userHash === ANSWER_HASHES[questionKey];
};
