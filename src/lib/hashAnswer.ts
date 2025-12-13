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

// Pre-computed hashes for the answers (kept as a decoy/base layer)
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

type QuestionKey = keyof typeof ANSWER_HASHES;

// Stronger, salted PBKDF2 hashes so answers are harder to brute-force offline.
// These are derived from the base ANSWER_HASHES values with per-question salts.
const SECURE_HASHES: Record<QuestionKey, { salt: string; hash: string }> = {
  question1: {
    salt: "ti279aa670LDih8PdB+VhA==",
    hash: "VFyUARvwD56qk1RCUiLOQ5G3uGnbdRbOwy5INT/fatg=",
  },
  question2: {
    salt: "N1/5HKGELI0ugjMxRcjW5g==",
    hash: "uJl9gIDbpJQnk0YOfcUHASw+wmFiMWHKbJSn1F1Hr3A=",
  },
  question3: {
    salt: "T8weFB1LwANcmNz+48QIEg==",
    hash: "MlTnGs8tLUahgjxEZW08rGCHwjA8NyC6PTmoEDmC2R0=",
  },
  question4: {
    salt: "GSE9pfX0t/Z7Gn/y5oXnFg==",
    hash: "oJxMJSXr1xVyiG5AgplCHKfpysqLJIPkiX5dSGY8JXU=",
  },
  question5: {
    salt: "NlYVwKl9YifpUx/mgsEXHA==",
    hash: "+qQ1dHAIrxO4wXdAa2DcRejfyYgnoyPl7DdLDjMLlvo=",
  },
  question6: {
    salt: "h4X9f+/TS5wIdbN5/r9cTQ==",
    hash: "6zf1yxx96sOjb78iKhVyfLOLlJ134zLmVNGdAN2oCjk=",
  },
  question7: {
    salt: "lPGW3+kpUpDU1SxeY7TLTw==",
    hash: "wMEs4WmW5BZV0WqPFHBVJcrW/jxHMKzP5aXfBZl3fGw=",
  },
  question8: {
    salt: "NhxJDpW+ntdObLgRMud1gQ==",
    hash: "G/Rk6xCyNrcahRyx1yC12xG/15Xe6dabhyrRT0qLdRM=",
  },
  question9: {
    salt: "wvPN/ZlRKzCCROrJA3AYXg==",
    hash: "SK3M5cDQFFAwRDnwP11dVZOLeihcCxWdiEEBqpEjDQo=",
  },
};

const PBKDF2_CONFIG = {
  iterations: 200_000,
  hash: "SHA-256",
  keyLength: 32,
} as const;

const encoder = new TextEncoder();

const base64ToBytes = (input: string): Uint8Array => {
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const bytesToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const deriveSecureHash = async (baseValue: string, saltB64: string): Promise<string> => {
  if (!("crypto" in globalThis) || !globalThis.crypto?.subtle) {
    console.error("SubtleCrypto not available");
    return "";
  }

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(baseValue),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltB64),
      iterations: PBKDF2_CONFIG.iterations,
      hash: PBKDF2_CONFIG.hash,
    },
    keyMaterial,
    PBKDF2_CONFIG.keyLength * 8,
  );

  return bytesToBase64(derived);
};

export const checkAnswer = async (userAnswer: string, questionKey: QuestionKey): Promise<boolean> => {
  const record = SECURE_HASHES[questionKey];
  if (!record) return false;

  const normalized = userAnswer.toUpperCase().trim();
  if (!normalized) return false;

  const baseHash = hashAnswer(normalized);
  const derivedHash = await deriveSecureHash(baseHash, record.salt);
  return derivedHash === record.hash;
};
