export type MakeItNaturalRequest = {
  text: string;
  context: string;
  language: string;
  selectedModel: string;
};

export type MakeItNaturalResponse = {
  result: string | null;
  error: string | null;
};
