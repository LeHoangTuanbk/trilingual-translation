import Anthropic from "@anthropic-ai/sdk";
import promptTemplate from "./prompt";

const client = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

interface TextBlock {
  text: string;

  type: "text";
}

async function createTranslationPromptAnthropic(
  japaneseText: string,
  model: string
) {
  const promptToEnglish = promptTemplate(japaneseText, "English");
  const promptToVietnamese = promptTemplate(japaneseText, "Vietnamese");
  const [chatCompletionEnglish, chatCompletionVietnamese] = await Promise.all([
    client.messages.create({
      max_tokens: 4096,
      messages: [{ role: "user", content: promptToEnglish }],
      model: model,
    }),
    client.messages.create({
      max_tokens: 4096,
      model: model,
      messages: [{ role: "user", content: promptToVietnamese }],
    }),
  ]);
  return {
    english: (chatCompletionEnglish.content[0] as TextBlock).text,
    vietnamese: (chatCompletionVietnamese.content[0] as TextBlock).text,
  };
}

export default createTranslationPromptAnthropic;
