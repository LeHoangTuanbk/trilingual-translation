import React, { ClipboardEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TranslationFormSchema,
  TranslationFormValues,
} from "@/features/translation/api";
import { Translation } from "./translation";
import { MODELS, Languages } from "@/utils";
import { useTranslation } from "@/features/translation/api"; // Your custom hook

export const TranslationContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TranslationFormValues>({
    resolver: zodResolver(TranslationFormSchema),
    defaultValues: {
      input: "",
      selectedModel: MODELS[0] ?? "",
      originalLanguage: Languages.Japanese,
      targetedLanguage1: Languages.English,
      targetedLanguage2: Languages.Vietnamese,
    },
  });

  const { english, vietnamese, isLoading, handleTranslate } = useTranslation();

  const inputValue = watch("input");
  const selectedModelValue = watch("selectedModel");

  const onSubmit = (data: TranslationFormValues) => {
    handleTranslate(data.input);
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setValue("input", pastedText);
    handleTranslate(pastedText);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      void handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Translation
        // React Hook Form bindings
        register={register}
        errors={errors}
        // Watched/derived values
        input={inputValue}
        selectedModel={selectedModelValue}
        isLoading={isLoading}
        english={english}
        vietnamese={vietnamese}
        models={MODELS}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
    </form>
  );
};
