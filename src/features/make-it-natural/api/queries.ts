import { MakeItNaturalRequest } from "@/app/api/make-it-natural/data.types";
import { useToastHook } from "@/shared/toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMakeItNaturalForm } from "./use-make-it-natural-form";

const makeItNaturalFn = async (
  text: string,
  language: string,
  context?: string
) => {
  const response = await axios.post("/api/make-it-natural", {
    text,
    context,
    language,
  });
  return response.data.result;
};

export const useMakeItNaturalQuery = () => {
  const { errorToast } = useToastHook();
  return useMutation({
    mutationFn: ({ text, context, language }: MakeItNaturalRequest) =>
      makeItNaturalFn(text, language, context),
    onError: () => {
      errorToast("Error", "Please try again later or choose another model");
    },
  });
};
