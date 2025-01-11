"use client";
import React, {
  ClipboardEvent,
  KeyboardEvent,
  useCallback,
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
import { TranslationModeKeysType } from "@/utils";
import { useToastHook } from "@/shared/toast";

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
  const [isAutoCopy1, setIsAutoCopy1] = useState(true);

  const { handleTranslate } = useTranslation();
  const { successToast } = useToastHook();

  const translation1RefObject = useRef<HTMLTextAreaElement>(null);
  const translation2RefObject = useRef<HTMLTextAreaElement>(null);

  const onTranslationSubmit = async (data: TranslationFormValues) => {
    setLoadingTranslation();
    const result = await handleTranslate({
      ...data,
    });

    const translation1Text = result[data.targetedLanguage1];
    const translation2Text = result[data.targetedLanguage2];

    updateTranslation(translation1Text, translation2Text);

    if (isAutoCopy1) {
      await navigator.clipboard.writeText(translation1Text);
      successToast("Copied to clipboard");
    }
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

  const handleLanguageShortcut = useCallback(
    (mode: TranslationModeKeysType) => {
      if (TranslationMode[mode]) {
        setValue("originalLanguage", TranslationMode[mode].originalLanguage);
        setValue("targetedLanguage1", TranslationMode[mode].targetLanguage1);
        setValue("targetedLanguage2", TranslationMode[mode].targetLanguage2);
      }
    },
    [setValue]
  );

  const handleAutoCopyChange1 = (checked: boolean) => {
    setIsAutoCopy1(checked);
  };
  // Todo: need to refactor: use copy hook
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const handleCopy = async (
    ref: React.RefObject<HTMLTextAreaElement>,
    setCopied: (value: boolean) => void
  ) => {
    if (ref.current) {
      await navigator.clipboard.writeText(ref.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;
      if (modifierKey) {
        handleLanguageShortcut(e.key as TranslationModeKeysType);
        if (TranslationMode[e.key as TranslationModeKeysType]) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleLanguageShortcut]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMounted, inputRef]);

  const formProps = {
    register,
    errors,
    onSubmit: handleSubmit(onTranslationSubmit),
  };

  const inputProps = {
    input: watch("input"),
    onKeyDown: handleKeyDown,
    onPaste: handlePaste,
    inputRef,
  };

  const modelProps = {
    selectedModel: watch("selectedModel"),
    isLoading: isSubmitting,
    models: MODELS,
  };

  const translationProps = {
    translation1,
    translation2,
    translation1Ref: translation1RefObject,
    translation2Ref: translation2RefObject,
    onAutoCopyChange1: handleAutoCopyChange1,
    isAutoCopy1,
    handleCopy,
  };

  const copyProps = {
    isCopied1,
    isCopied2,
    setIsCopied1,
    setIsCopied2,
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <Translation
      {...formProps}
      {...inputProps}
      {...modelProps}
      {...translationProps}
      {...copyProps}
    />
  );
};
