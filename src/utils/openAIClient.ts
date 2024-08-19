import OpenAI from "openai";
import promptTemplate from "./prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createTranslationPrompt(japaneseText: string, model: string) {
  const promptToEnglish = promptTemplate(japaneseText, "English");
  const promptToVietnamese = promptTemplate(japaneseText, "Vietnamese");
  const chatCompletionEnglish = await client.chat.completions.create({
    model: model,
    messages: [{ role: "system", content: promptToEnglish }],
  });
  const chatCompletionVietnamese = await client.chat.completions.create({
    model: model,
    messages: [{ role: "system", content: promptToVietnamese }],
  });
  return {
    english: chatCompletionEnglish.choices[0].message.content,
    vietnamese: chatCompletionVietnamese.choices[0].message.content,
  };
}

export default createTranslationPrompt;