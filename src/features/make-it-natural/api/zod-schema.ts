import { z } from "zod";
import { Languages } from "@/utils";
export const makeItNaturalSchema = z.object({
  text: z.string().min(1, "Text is required"),
  context: z.string().optional(),
  language: z.enum(Object.values(Languages) as [string, ...string[]]),
  result: z.string().optional(),
});

export type MakeItNaturalFormValues = z.infer<typeof makeItNaturalSchema>;
