import { NextRequest, NextResponse } from "next/server";
import createTranslationPromptOpenAI from "@/utils/openAIClient";
import createTranslationPromptAnthropic from "@/utils/anthropicClient";
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/utils/consts";

interface TranslationRequest {
  japaneseText: string;
  model: string;
}

export async function POST(request: NextRequest) {
  const body: TranslationRequest = await request.json();
  const { japaneseText, model } = body;
  if (OPENAI_MODELS.includes(model)) {
    const result = await createTranslationPromptOpenAI(japaneseText, model);
    return NextResponse.json({ result });
  } else if (ANTHROPIC_MODELS.includes(model)) {
    const result = await createTranslationPromptAnthropic(japaneseText, model);
    return NextResponse.json({ result });
  }
  return NextResponse.json({ error: "Invalid model" });
}
