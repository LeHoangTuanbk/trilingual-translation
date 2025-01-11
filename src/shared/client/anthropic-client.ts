import Anthropic from "@anthropic-ai/sdk";
import { promptTemplate, makeItNaturalPromptTemplate } from "@/utils/prompt";
import { TranslationRequest } from "@/app/api/translate/data.types";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";
import { MakeItNaturalRequest } from "@/app/api/make-it-natural/data.types";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"],
});

export const createTranslationPromptAnthropic = async ({
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
      client.messages.create({
        max_tokens: 4096,
        messages: [{ role: "user", content: promptToTargetedLanguage1 }],
        model: selectedModel,
      }),
      client.messages.create({
        max_tokens: 4096,
        model: selectedModel,
        messages: [{ role: "user", content: promptToTargetedLanguage2 }],
      }),
    ]);
  if (
    !chatCompletionTargetedLanguage1.content[0] ||
    !chatCompletionTargetedLanguage2.content[0]
  ) {
    return {
      [targetedLanguage1]: "",
      [targetedLanguage2]: "",
    };
  }
  return {
    [targetedLanguage1]: (
      chatCompletionTargetedLanguage1.content[0] as TextBlock
    ).text,
    [targetedLanguage2]: (
      chatCompletionTargetedLanguage2.content[0] as TextBlock
    ).text,
  };
};

export const createMakeItNaturalPromptAnthropic = async ({
  text,
  language,
  selectedModel,
  context,
}: MakeItNaturalRequest) => {
  const prompt = makeItNaturalPromptTemplate(text, language, context);
  const chatCompletion = await client.messages.create({
    max_tokens: 4096,
    model: selectedModel,
    messages: [{ role: "user", content: prompt }],
  });
  return {
    result: (chatCompletion.content[0] as TextBlock).text,
    error: null,
  };
};
