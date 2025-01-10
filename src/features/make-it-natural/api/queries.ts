import { MakeItNaturalRequest } from "@/app/api/make-it-natural/data.types";
import { useToastHook } from "@/shared/toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const makeItNaturalFn = async (
  text: string,
  language: string,
  selectedModel: string,
  context?: string
) => {
  const response = await axios.post("/api/make-it-natural", {
    text,
    context,
    language,
    selectedModel,
  });
  return response.data.result;
};

export const useMakeItNaturalQuery = () => {
  const { errorToast } = useToastHook();
  return useMutation({
    mutationFn: ({
      text,
      context,
      language,
      selectedModel,
    }: MakeItNaturalRequest) =>
      makeItNaturalFn(text, language, selectedModel, context),
    onError: () => {
      errorToast("Error", "Please try again later or choose another model");
    },
  });
};
