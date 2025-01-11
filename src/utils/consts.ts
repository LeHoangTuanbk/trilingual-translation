// Todo: need to refactor to dictionary, not array like this
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
  Korean: "Korean",
  Chinese: "Chinese",
  Spanish: "Spanish",
} as const;

type LanguageType = (typeof Languages)[keyof typeof Languages];

const DEFAULT_MODEL = ANTHROPIC_MODELS[2];

const MODELS = [...OPENAI_MODELS, ...ANTHROPIC_MODELS];

const TranslationMode = {
  "1": {
    originalLanguage: Languages.Japanese,
    targetLanguage1: Languages.English,
    targetLanguage2: Languages.Vietnamese,
  },
  "2": {
    originalLanguage: Languages.Vietnamese,
    targetLanguage1: Languages.Japanese,
    targetLanguage2: Languages.English,
  },
  "3": {
    originalLanguage: Languages.English,
    targetLanguage1: Languages.Vietnamese,
    targetLanguage2: Languages.Japanese,
  },
} as const;

const TranslationModeKeysType = Object.keys(
  TranslationMode
) as (keyof typeof TranslationMode)[];

type TranslationModeKeysType = (typeof TranslationModeKeysType)[number];

export {
  OPENAI_MODELS,
  ANTHROPIC_MODELS,
  MODELS,
  DEFAULT_MODEL,
  Languages,
  TranslationMode,
  type LanguageType,
  type TranslationModeKeysType,
};
