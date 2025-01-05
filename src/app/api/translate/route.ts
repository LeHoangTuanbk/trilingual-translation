import { NextRequest, NextResponse } from "next/server";
import {
  createTranslationPromptOpenAI,
  createTranslationPromptAnthropic,
} from "@/shared/client";
import { OPENAI_MODELS, ANTHROPIC_MODELS } from "@/utils/consts";

import { TranslationRequest } from "./data.types";

export async function POST(request: NextRequest) {
  const body: TranslationRequest = await request.json();
  const { selectedModel } = body;
  if (OPENAI_MODELS.includes(selectedModel)) {
    const result = await createTranslationPromptOpenAI(body);
    return NextResponse.json({ result });
  } else if (ANTHROPIC_MODELS.includes(selectedModel)) {
    const result = await createTranslationPromptAnthropic(body);
    return NextResponse.json({ result });
  }
  return NextResponse.json({ error: "Invalid model" });
}
