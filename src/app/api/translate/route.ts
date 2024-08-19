import { NextRequest, NextResponse } from "next/server";
import createTranslationPrompt from "@/utils/openAIClient";

interface TranslationRequest {
  japaneseText: string;
  model: string;
}

export async function POST(request: NextRequest) {
  const body: TranslationRequest = await request.json();
  const { japaneseText, model } = body;
  const result = await createTranslationPrompt(japaneseText, model);
  return NextResponse.json({ result });
}
