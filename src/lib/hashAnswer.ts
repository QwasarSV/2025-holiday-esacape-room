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
  question1: "-pf2tqc", // SNOWFLAKE
  question2: "1lrklv",  // CAROL
  question3: "1ygp39sy", // BINARY BLIZZARD
  question4: "-h7zj3i", // CLAUSECODE
  question5: "-q5xmxs", // DEBUGGLE
  question6: "2n4jc",   // NOEL
  question7: "-1b60nva", // YEAR OF THE HORSE
  question8: "1mpk28",  // EGGNOG
  question9: "-swxgze"  // PAKHLAVA
};

export const checkAnswer = (userAnswer: string, questionKey: keyof typeof ANSWER_HASHES): boolean => {
  const userHash = hashAnswer(userAnswer);
  return userHash === ANSWER_HASHES[questionKey];
};
