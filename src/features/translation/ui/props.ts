import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ClipboardEvent, FormEventHandler, KeyboardEvent } from "react";
import type { TranslationFormValues } from "@/features/translation/api";

type FormProps = {
  register: UseFormRegister<TranslationFormValues>;
  errors: FieldErrors<TranslationFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

type InputProps = {
  input: string;
  onPaste: (e: ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
};

type ModelProps = {
  selectedModel: string;
  isLoading: boolean;
  models: string[];
};

type TranslationOutputProps = {
  translation1: string;
  translation2: string;
  translation1Ref: React.RefObject<HTMLTextAreaElement>;
  translation2Ref: React.RefObject<HTMLTextAreaElement>;
  onAutoCopyChange1: (checked: boolean) => void;
  isAutoCopy1: boolean;
  isCopied1: boolean;
  isCopied2: boolean;
  handleCopy: (
    ref: React.RefObject<HTMLTextAreaElement>,
    setIsCopied: (isCopied: boolean) => void
  ) => void;
  setIsCopied1: (isCopied: boolean) => void;
  setIsCopied2: (isCopied: boolean) => void;
};

export type TranslationPresenterProps = FormProps &
  InputProps &
  ModelProps &
  TranslationOutputProps;
