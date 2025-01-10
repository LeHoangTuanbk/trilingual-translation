import { NextRequest, NextResponse } from "next/server";

import { MakeItNaturalRequest, MakeItNaturalResponse } from "./data.types";
import { createMakeItNaturalPOpenAI } from "@/shared/client/openai-client";

export async function POST(request: NextRequest) {
  const body: MakeItNaturalRequest = await request.json();
  const { text, context, language, selectedModel } = body;
  try {
    // Todo: need to solve anthropic model
    const result: MakeItNaturalResponse = await createMakeItNaturalPOpenAI({
      text,
      context,
      language,
      selectedModel,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to make it natural" },
      { status: 500 }
    );
  }
}
