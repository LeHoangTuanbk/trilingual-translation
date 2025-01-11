import { z } from "zod";
import { Languages, MODELS } from "@/utils";
export const makeItNaturalSchema = z.object({
  text: z
    .string()
    .min(5, "The app performs better with 5 or more words.")
    .max(1000, "The app performs better with 1000 or less words."),
  context: z.string(),
  language: z.enum(Object.values(Languages) as [string, ...string[]]),
  selectedModel: z.enum(MODELS as unknown as [string, ...string[]]),
  result: z.string().optional(),
});

export type MakeItNaturalFormValues = z.infer<typeof makeItNaturalSchema>;
