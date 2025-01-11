"use client";

import { MakeItNatural } from "./make-it-natural";

import { DEFAULT_MODEL, Languages } from "@/utils";
import { useEffect, useRef, useState } from "react";
import {
  useMakeItNaturalForm,
  useMakeItNaturalQuery,
} from "@/features/make-it-natural/api";
import { MakeItNaturalFormValues } from "../api/zod-schema";
import { useToastHook } from "@/shared/toast";
import { KeyboardEvent } from "react";
export const MakeItNaturalContainer = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCopy, setIsAutoCopy] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useMakeItNaturalForm({
    text: "",
    context: "business context",
    language: Languages.English,
    selectedModel: DEFAULT_MODEL,
  });

  const adjustResultHeight = (element1: HTMLTextAreaElement | null) => {
    if (element1) {
      element1.style.height = "auto";
      element1.style.height = `${element1.scrollHeight}px`;
    }
  };
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { mutate, isPending } = useMakeItNaturalQuery();
  const { successToast } = useToastHook();

  const handleMakeItNatural = (data: MakeItNaturalFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        setValue("result", data.result);
        adjustResultHeight(resultRef.current);
        if (isAutoCopy) {
          navigator.clipboard.writeText(data.result);
          successToast("Copied to clipboard");
        }
      },
    });
  };
  const result = watch("result");

  const handleCopyResult = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(result || "");
    successToast("Copied to clipboard");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMounted]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(handleMakeItNatural)();
    }
  };

  if (!hasMounted) return null;

  return (
    <MakeItNatural
      register={register}
      errors={errors}
      isPending={isPending}
      isAutoCopy={isAutoCopy}
      isCopied={isCopied}
      inputRef={inputRef}
      resultRef={resultRef}
      onSubmit={handleSubmit(handleMakeItNatural)}
      onKeyDown={handleKeyDown}
      onCopyResult={handleCopyResult}
      onAutoCopyChange={() => setIsAutoCopy(!isAutoCopy)}
    />
  );
};
