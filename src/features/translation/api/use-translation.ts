import { useState, useCallback } from "react";
import axios from "axios";
import { DEFAULT_MODEL, Languages } from "@/utils";
import { useToastHook } from "@/shared/toast";
import { LanguageType } from "@/utils/consts";
import { TranslationFormValues } from "./translation-schema";
export const useTranslation = <T extends TranslationFormValues>() => {
  const [isLoading, setIsLoading] = useState(false);

  const { errorToast } = useToastHook();

  const handleTranslate = useCallback(
    async (data: TranslationFormValues) => {
      if (!data.input.trim()) {
        return;
      }

      setIsLoading(true);

      try {
        const res = await axios.post("/api/translate", {
          ...data,
        });
        return res.data.result || {};
      } catch (error) {
        errorToast("Error", "Please try again later or choose another model");
      } finally {
        setIsLoading(false);
      }
    },
    [errorToast]
  );

  return {
    isLoading,
    handleTranslate,
  };
};
