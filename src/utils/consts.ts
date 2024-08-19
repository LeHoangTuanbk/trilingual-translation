const openAiModels = ["gpt-4o-mini", "gpt-4o"];

const AnthropicModels = [
  "claude-3-haiku-20240307",
  "claude-3-sonnet-20240229",
  "claude-3-5-sonnet-20240620",
];

const models = [...openAiModels, ...AnthropicModels];

export { openAiModels, AnthropicModels, models };
