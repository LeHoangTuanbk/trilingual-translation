const OPENAI_MODELS = ["gpt-4o-mini", "gpt-4o"];

const ANTHROPIC_MODELS = [
  "claude-3-haiku-20240307",
  "claude-3-sonnet-20240229",
  "claude-3-5-sonnet-20240620",
];

const Languages = {
  English: "English",
  Vietnamese: "Vietnamese",
  Japanese: "Japanese",
} as const;

type LanguageType = (typeof Languages)[keyof typeof Languages];

const DEFAULT_MODEL = "gpt-4o";

const MODELS = [...OPENAI_MODELS, ...ANTHROPIC_MODELS];

export {
  OPENAI_MODELS,
  ANTHROPIC_MODELS,
  MODELS,
  DEFAULT_MODEL,
  Languages,
  type LanguageType,
};
