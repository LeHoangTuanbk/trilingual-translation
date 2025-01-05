import { Translation } from "./translation";
import { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

import { MODELS } from "@/utils";
import { useTranslation } from "@/features/translation/api";
import { LanguageType } from "@/utils/consts";

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
    originalLanguage,
    setOriginalLanguage,
    targetedLanguage1,
    setTargetedLanguage1,
    targetedLanguage2,
    setTargetedLanguage2,
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

  const handleOriginalLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOriginalLanguage(e.target.value as LanguageType);
  };

  const handleTargetedLanguage1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetedLanguage1(e.target.value as LanguageType);
  };

  const handleTargetedLanguage2Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setTargetedLanguage2(e.target.value as LanguageType);
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
      onLanguageChange={handleOriginalLanguageChange}
      originalLanguage={originalLanguage}
      targetedLanguage1={targetedLanguage1}
      targetedLanguage2={targetedLanguage2}
      onTargetedLanguage1Change={handleTargetedLanguage1Change}
      onTargetedLanguage2Change={handleTargetedLanguage2Change}
    />
  );
};
