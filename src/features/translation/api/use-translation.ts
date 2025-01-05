import { useState, useCallback } from "react";
import axios from "axios";
import { DEFAULT_MODEL } from "@/utils";

export const useTranslation = () => {
  const [input, setInput] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState(false);

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
          console.error("Translation data is missing or incomplete.");
        }
      } catch (error) {
        console.error("Translation Error:", error);
        setEnglish(
          "Error occurred during translation. Please try again later or choose another model."
        );
        setVietnamese(
          "Error occurred during translation. Please try again later or choose another model."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [selectedModel]
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
  };
};
