import React, { ClipboardEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TranslationFormSchema,
  TranslationFormValues,
} from "@/features/translation/api";
import { Translation } from "./translation";
import { MODELS, Languages, DEFAULT_MODEL } from "@/utils";
import { useTranslation } from "@/features/translation/api";

export const TranslationContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TranslationFormValues>({
    resolver: zodResolver(TranslationFormSchema),
    defaultValues: {
      input: "",
      selectedModel: DEFAULT_MODEL,
      originalLanguage: Languages.Japanese,
      targetedLanguage1: Languages.English,
      targetedLanguage2: Languages.Vietnamese,
      translation1: "",
      translation2: "",
    },
  });

  const { handleTranslate } = useTranslation();

  const inputValue = watch("input");
  const selectedModelValue = watch("selectedModel");

  const onTranslationSubmit = async (data: TranslationFormValues) => {
    setLoadingTranslation();
    const result = await handleTranslate({
      ...data,
    });
    updateTranslation(
      result[data.targetedLanguage1],
      result[data.targetedLanguage2]
    );
  };

  const submitForm = handleSubmit(onTranslationSubmit);

  const updateTranslation = (translation1: string, translation2: string) => {
    setValue("translation1", translation1);
    setValue("translation2", translation2);
  };

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setValue("input", pastedText);
    submitForm();
  };

  const setLoadingTranslation = () => {
    setValue("translation1", "Loading...");
    setValue("translation2", "Loading...");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const formValues = watch();
      submitForm();
    }
  };

  return (
    <Translation
      register={register}
      errors={errors}
      input={inputValue}
      selectedModel={selectedModelValue}
      isLoading={isSubmitting}
      models={MODELS}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onSubmit={submitForm}
    />
  );
};
