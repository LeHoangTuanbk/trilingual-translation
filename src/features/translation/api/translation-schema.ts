// translation-schema.ts
import { z } from "zod";
import { Languages, type LanguageType } from "@/utils";

export const TranslationFormSchema = z.object({
  input: z
    .string()
    .min(1, "Please enter a text")
    .max(1000, "Text cannot exceed 1000 characters"),
  selectedModel: z.string().min(1, "Please select a model"),
  originalLanguage: z.enum(Object.values(Languages) as [LanguageType]),
  targetedLanguage1: z.enum(Object.values(Languages) as [LanguageType]),
  targetedLanguage2: z.enum(Object.values(Languages) as [LanguageType]),
});

export type TranslationFormValues = z.infer<typeof TranslationFormSchema>;
