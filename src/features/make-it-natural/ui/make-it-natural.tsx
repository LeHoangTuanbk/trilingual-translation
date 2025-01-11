"use client";
import {
  Box,
  Textarea,
  Button,
  VStack,
  Select,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DEFAULT_MODEL, Languages, MODELS } from "@/utils";
import { useEffect, useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import {
  useMakeItNaturalForm,
  useMakeItNaturalQuery,
} from "@/features/make-it-natural/api";
import { MakeItNaturalFormValues } from "../api/zod-schema";
import { useToastHook } from "@/shared/toast";

export const MakeItNatural = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useMakeItNaturalForm({
    text: "",
    context: "business context",
    language: Languages.English,
    selectedModel: DEFAULT_MODEL,
  });
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { mutate, isPending } = useMakeItNaturalQuery();
  const { successToast } = useToastHook();

  const handleMakeItNatural = (data: MakeItNaturalFormValues) => {
    mutate(data, {
      onSuccess: (data) => {
        setValue("result", data.result);
        if (isCopied) {
          navigator.clipboard.writeText(data.result);
          successToast("Copied to clipboard");
        }
      },
    });
  };

  if (!hasMounted) return null;
  return (
    <>
      <form onSubmit={handleSubmit(handleMakeItNatural)}>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <FormControl isInvalid={!!errors.text}>
            <Textarea
              placeholder="Enter your text here"
              height="150px"
              {...register("text")}
            />
            {errors.text && (
              <FormErrorMessage>{errors.text.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <Stack
              direction={{ base: "column", md: "row" }}
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <FormLabel>Model</FormLabel>
              <Select
                {...register("selectedModel")}
                mr="4"
                w="fit-content"
                minW="300px"
              >
                {MODELS.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </Select>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>
              Context of your text (optional) : business, academic, casual
              conversation, etc.
            </FormLabel>
            <Textarea
              placeholder="Enter context here"
              height="50px"
              {...register("context")}
            />
          </FormControl>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="4"
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <Text>Your text is in</Text>
            <Select
              mr="4"
              w="fit-content"
              minW="300px"
              {...register("language")}
              isInvalid={!!errors.language}
            >
              {Object.values(Languages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
            <Button type="submit" isLoading={isPending} w="150px">
              Make it natural
            </Button>
          </Stack>
          <HStack gap="4">
            <Text>Result</Text>
            <Checkbox onChange={() => setIsCopied(!isCopied)}>
              Auto copy
            </Checkbox>
            <Button
              background="none"
              borderRadius="md"
              _hover={{ background: "none" }}
              alignSelf="flex-start"
              onClick={() => {
                setIsCopied(!isCopied);
              }}
            >
              <Box mr="2">{isCopied ? <FaCheck /> : <FaRegCopy />}</Box>
              <Text>{isCopied ? "Copied" : "Copy"}</Text>
            </Button>
          </HStack>
          <FormControl>
            <Textarea
              placeholder="Result"
              height="3xs"
              {...register("result")}
            />
          </FormControl>
        </VStack>
      </form>
    </>
  );
};
