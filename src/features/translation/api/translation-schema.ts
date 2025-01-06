import { z } from "zod";
import { Languages, type LanguageType } from "@/utils";

export const TranslationFormSchema = z
  .object({
    input: z
      .string()
      .min(1, "Please enter a text")
      .max(1000, "Text cannot exceed 1000 characters"),
    selectedModel: z.string().min(1, "Please select a model"),
    originalLanguage: z.enum(Object.values(Languages) as [LanguageType]),
    targetedLanguage1: z.enum(Object.values(Languages) as [LanguageType]),
    targetedLanguage2: z.enum(Object.values(Languages) as [LanguageType]),
  })
  .refine((data) => data.originalLanguage !== data.targetedLanguage1, {
    message: "Targeted Language 1 must be different from Original language",
    path: ["targetedLanguage1"],
  })
  .refine((data) => data.originalLanguage !== data.targetedLanguage2, {
    message: "Targeted Language 2 must be different from Original language",
    path: ["targetedLanguage2"],
  })
  .refine((data) => data.targetedLanguage1 !== data.targetedLanguage2, {
    message: "Targeted Language 2 must be different from Targeted Language 1",
    path: ["targetedLanguage2"],
  });

export type TranslationFormValues = z.infer<typeof TranslationFormSchema>;
