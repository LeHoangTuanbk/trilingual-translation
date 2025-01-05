import { Translation } from "./translation";
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useCallback,
} from "react";

import axios from "axios";
import { MODELS, DEFAULT_MODEL } from "@/utils";

export const TranslationContainer = () => {
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

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate(input);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setInput(pastedText);
    handleTranslate(pastedText);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  return (
    <Translation
      input={input}
      english={english}
      vietnamese={vietnamese}
      selectedModel={selectedModel}
      isLoading={isLoading}
      models={MODELS}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onModelChange={handleModelChange}
      onTranslate={handleTranslate}
    />
  );
};
