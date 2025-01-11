"use client";

import { MakeItNatural } from "./make-it-natural";
import { DEFAULT_MODEL, Languages } from "@/utils";
import { useEffect, useState } from "react";
import {
  useMakeItNaturalForm,
  useMakeItNaturalQuery,
} from "@/features/make-it-natural/api";
import { MakeItNaturalFormValues } from "../api/zod-schema";
import { useToastHook } from "@/shared/toast";
import { KeyboardEvent } from "react";
import { useCopyFeature } from "@/shared/hooks/copy-hook";
import { useTextAreaAdjustment } from "@/shared/hooks/text-area-adjustment";

export const MakeItNaturalContainer = () => {
  const [hasMounted, setHasMounted] = useState(false);

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

  const result = watch("result");
  const { mutate, isPending } = useMakeItNaturalQuery();
  const { inputRef, resultRef, adjustResultHeight } = useTextAreaAdjustment();
  const { isCopied, isAutoCopy, handleCopyResult, setIsAutoCopy } =
    useCopyFeature(result || "");

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const { successToast } = useToastHook();

  const handleMakeItNatural = (data: MakeItNaturalFormValues) => {
    mutate(data, {
      onSuccess: async (data) => {
        setValue("result", data.result);
        adjustResultHeight(resultRef.current);
        if (isAutoCopy) {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(data.result);
            successToast("Copied to clipboard");
          }
        }
      },
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMounted, inputRef]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(handleMakeItNatural)();
    }
  };

  if (!hasMounted) return null;

  const formProps = {
    register,
    errors,
    onSubmit: handleSubmit(handleMakeItNatural),
    onKeyDown: handleKeyDown,
  };

  const copyProps = {
    isAutoCopy,
    isCopied,
    onCopyResult: handleCopyResult,
    onAutoCopyChange: () => setIsAutoCopy(!isAutoCopy),
  };

  const refs = {
    inputRef,
    resultRef,
  };

  return (
    <MakeItNatural
      {...formProps}
      {...copyProps}
      {...refs}
      isPending={isPending}
    />
  );
};
