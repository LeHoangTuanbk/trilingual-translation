import { NextRequest, NextResponse } from "next/server";

import { MakeItNaturalRequest, MakeItNaturalResponse } from "./data.types";
import { createMakeItNaturalPOpenAI } from "@/shared/client/openai-client";
import { ANTHROPIC_MODELS } from "@/utils/consts";
import { OPENAI_MODELS } from "@/utils/consts";
import { createMakeItNaturalPromptAnthropic } from "@/shared/client/anthropic-client";

export async function POST(request: NextRequest) {
  const body: MakeItNaturalRequest = await request.json();
  const { text, context, language, selectedModel } = body;
  try {
    if (OPENAI_MODELS.includes(selectedModel)) {
      const result: MakeItNaturalResponse = await createMakeItNaturalPOpenAI({
        text,
        context,
        language,
        selectedModel,
      });
      return NextResponse.json({ result });
    }
    if (ANTHROPIC_MODELS.includes(selectedModel)) {
      const result: MakeItNaturalResponse =
        await createMakeItNaturalPromptAnthropic({
          text,
          context,
          language,
          selectedModel,
        });
      return NextResponse.json({ result });
    }
    return NextResponse.json({ error: "Invalid model" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to make it natural" },
      { status: 500 }
    );
  }
}
