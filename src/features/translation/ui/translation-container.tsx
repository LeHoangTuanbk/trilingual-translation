"use client";
import React, {
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TranslationFormSchema,
  TranslationFormValues,
} from "@/features/translation/api";
import { Translation } from "./translation";
import { MODELS, Languages, DEFAULT_MODEL, TranslationMode } from "@/utils";
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
    },
  });
  const [translation1, setTranslation1] = useState("");
  const [translation2, setTranslation2] = useState("");

  const { handleTranslate } = useTranslation();

  const inputValue = watch("input");
  const selectedModelValue = watch("selectedModel");

  const translation1RefObject = useRef<HTMLTextAreaElement>(null);
  const translation2RefObject = useRef<HTMLTextAreaElement>(null);

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
    setTranslation1(translation1);
    setTranslation2(translation2);
  };

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setValue("input", pastedText);
    submitForm();
  };

  const setLoadingTranslation = () => {
    setTranslation1("Loading...");
    setTranslation2("Loading...");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submitForm();
    }
  };

  const adjustHeight = (
    element1: HTMLTextAreaElement | null,
    element2: HTMLTextAreaElement | null
  ) => {
    if (element1 && element2) {
      element1.style.height = "auto";
      element2.style.height = "auto";

      const maxHeight = Math.max(element1.scrollHeight, element2.scrollHeight);

      element1.style.height = `${maxHeight}px`;
      element2.style.height = `${maxHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight(translation1RefObject.current, translation2RefObject.current);
  }, [translation1, translation2]);

  const handleLanguageShortcut = (mode: string) => {
    console.log(mode);
    console.log(TranslationMode[mode as keyof typeof TranslationMode]);
    setValue(
      "originalLanguage",
      TranslationMode[mode as keyof typeof TranslationMode].originalLanguage
    );
    setValue(
      "targetedLanguage1",
      TranslationMode[mode as keyof typeof TranslationMode].targetLanguage1
    );
    setValue(
      "targetedLanguage2",
      TranslationMode[mode as keyof typeof TranslationMode].targetLanguage2
    );
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
      translation1={translation1}
      translation2={translation2}
      translation1Ref={translation1RefObject}
      translation2Ref={translation2RefObject}
      onLanguageShortcut={handleLanguageShortcut}
    />
  );
};
