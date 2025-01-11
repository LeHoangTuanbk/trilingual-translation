import { z } from "zod";
import { Languages, MODELS } from "@/utils";
export const makeItNaturalSchema = z.object({
  text: z
    .string()
    .min(10, "The app performs better with 10 or more characters.")
    .max(5000, "The app performs better with 5000 or less characters."),
  context: z.string(),
  language: z.enum(Object.values(Languages) as [string, ...string[]]),
  selectedModel: z.enum(MODELS as unknown as [string, ...string[]]),
  result: z.string().optional(),
});

export type MakeItNaturalFormValues = z.infer<typeof makeItNaturalSchema>;
