import OpenAI from "openai";
import promptTemplate from "../../utils/prompt";
import { TranslationRequest } from "@/app/api/translate/data.types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createTranslationPromptOpenAI = async ({
  input,
  selectedModel,
  originalLanguage,
  targetedLanguage1,
  targetedLanguage2,
}: TranslationRequest) => {
  const promptToTargetedLanguage1 = promptTemplate(
    input,
    originalLanguage,
    targetedLanguage1
  );
  const promptToTargetedLanguage2 = promptTemplate(
    input,
    originalLanguage,
    targetedLanguage2
  );
  const [chatCompletionTargetedLanguage1, chatCompletionTargetedLanguage2] =
    await Promise.all([
      client.chat.completions.create({
        model: selectedModel,
        messages: [{ role: "system", content: promptToTargetedLanguage1 }],
      }),
      client.chat.completions.create({
        model: selectedModel,
        messages: [{ role: "system", content: promptToTargetedLanguage2 }],
      }),
    ]);
  return {
    [targetedLanguage1]:
      chatCompletionTargetedLanguage1.choices[0].message.content,
    [targetedLanguage2]:
      chatCompletionTargetedLanguage2.choices[0].message.content,
  };
};
