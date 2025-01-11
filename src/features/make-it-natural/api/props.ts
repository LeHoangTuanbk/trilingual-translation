import { MakeItNaturalFormValues } from "../api/zod-schema";
import { KeyboardEvent } from "react";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

type FormProps = {
  register: UseFormRegister<MakeItNaturalFormValues>;
  errors: FieldErrors<MakeItNaturalFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

type CopyProps = {
  isAutoCopy: boolean;
  isCopied: boolean;
  onCopyResult: () => void;
  onAutoCopyChange: () => void;
};

type RefProps = {
  inputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  resultRef: React.MutableRefObject<HTMLTextAreaElement | null>;
};

export type MakeItNaturalProps = FormProps &
  CopyProps &
  RefProps & {
    isPending: boolean;
  };
