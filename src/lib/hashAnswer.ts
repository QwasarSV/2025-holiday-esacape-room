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
  question1: "-1m73z9d", // SNOWFLAKE
  question2: "-1fz1aw"   // CAROL
};

export const checkAnswer = (userAnswer: string, questionKey: keyof typeof ANSWER_HASHES): boolean => {
  const userHash = hashAnswer(userAnswer);
  return userHash === ANSWER_HASHES[questionKey];
};
