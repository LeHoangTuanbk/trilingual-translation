import { z } from "zod";
import { Languages, MODELS } from "@/utils";
export const makeItNaturalSchema = z.object({
  text: z.string().min(1, "Text is required"),
  context: z.string().optional(),
  language: z.enum(Object.values(Languages) as [string, ...string[]]),
  selectedModel: z.enum(MODELS as unknown as [string, ...string[]]),
  result: z.string().optional(),
});

export type MakeItNaturalFormValues = z.infer<typeof makeItNaturalSchema>;
