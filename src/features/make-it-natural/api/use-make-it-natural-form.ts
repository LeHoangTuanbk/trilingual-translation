import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeItNaturalSchema, MakeItNaturalFormValues } from "./zod-schema";

export const useMakeItNaturalForm = () => {
  return useForm<MakeItNaturalFormValues>({
    resolver: zodResolver(makeItNaturalSchema),
  });
};
