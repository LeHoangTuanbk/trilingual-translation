import { NextRequest, NextResponse } from "next/server";

import { MakeItNaturalRequest } from "./data.types";

export async function POST(request: NextRequest) {
  const body: MakeItNaturalRequest = await request.json();
  const { text, context, language } = body;
  //   Todo: Will implement real logic later
  return NextResponse.json({ result: "Hello" + text });
}
