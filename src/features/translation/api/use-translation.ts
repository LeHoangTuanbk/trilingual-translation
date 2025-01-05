import { useCallback } from "react";
import axios from "axios";
import { useToastHook } from "@/shared/toast";
import { TranslationFormValues } from "./translation-schema";
export const useTranslation = <T extends TranslationFormValues>() => {
  const { errorToast } = useToastHook();

  const handleTranslate = useCallback(
    async (data: TranslationFormValues) => {
      if (!data.input.trim()) {
        return;
      }

      try {
        const res = await axios.post("/api/translate", {
          ...data,
        });
        return res.data.result || {};
      } catch (error) {
        errorToast("Error", "Please try again later or choose another model");
      } finally {
      }
    },
    [errorToast]
  );

  return {
    handleTranslate,
  };
};
