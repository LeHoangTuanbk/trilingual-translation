import { Translation } from "./translation";
import { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

import { MODELS } from "@/utils";
import { useTranslation } from "@/features/translation/api";

export const TranslationContainer = () => {
  const {
    input,
    setInput,
    english,
    vietnamese,
    selectedModel,
    isLoading,
    setSelectedModel,
    handleTranslate,
  } = useTranslation();

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
