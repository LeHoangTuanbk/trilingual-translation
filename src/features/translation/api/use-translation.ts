import { useState, useCallback } from "react";
import axios from "axios";
import { DEFAULT_MODEL, Languages } from "@/utils";
import { useToastHook } from "@/shared/toast";
import { LanguageType } from "@/utils/consts";
export const useTranslation = () => {
  const [input, setInput] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState(false);
  const [originalLanguage, setOriginalLanguage] = useState<LanguageType>(
    Languages.Japanese
  );
  const [targetedLanguage1, setTargetedLanguage1] = useState<LanguageType>(
    Languages.English
  );
  const [targetedLanguage2, setTargetedLanguage2] = useState<LanguageType>(
    Languages.Vietnamese
  );
  const { errorToast } = useToastHook();

  const handleTranslate = useCallback(
    async (textToTranslate: string) => {
      if (!textToTranslate.trim()) {
        setInput("");
        setEnglish("");
        setVietnamese("");
        return;
      }

      setIsLoading(true);
      setEnglish("Loading...");
      setVietnamese("Loading...");
      try {
        const res = await axios.post("/api/translate", {
          japaneseText: textToTranslate,
          model: selectedModel,
        });
        const { english: translatedEnglish, vietnamese: translatedVietnamese } =
          res.data.result || {};
        if (translatedEnglish && translatedVietnamese) {
          setEnglish(translatedEnglish);
          setVietnamese(translatedVietnamese);
        } else {
          setEnglish("");
          setVietnamese("");
        }
      } catch (error) {
        errorToast("Error", "Please try again later or choose another model");
        setEnglish("");
        setVietnamese("");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedModel, errorToast]
  );

  return {
    input,
    setInput,
    english,
    vietnamese,
    selectedModel,
    isLoading,
    setSelectedModel,
    handleTranslate,
    originalLanguage,
    setOriginalLanguage,
    targetedLanguage1,
    setTargetedLanguage1,
    targetedLanguage2,
    setTargetedLanguage2,
  };
};
