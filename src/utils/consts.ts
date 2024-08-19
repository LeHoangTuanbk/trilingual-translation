const OPENAI_MODELS = ["gpt-4o-mini", "gpt-4o"];

const ANTHROPIC_MODELS = [
  "claude-3-haiku-20240307",
  "claude-3-sonnet-20240229",
  "claude-3-5-sonnet-20240620",
];

const MODELS = [...OPENAI_MODELS, ...ANTHROPIC_MODELS];

export { OPENAI_MODELS, ANTHROPIC_MODELS, MODELS };
