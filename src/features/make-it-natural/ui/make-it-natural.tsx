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
import { useEffect, useRef, useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import {
  useMakeItNaturalForm,
  useMakeItNaturalQuery,
} from "@/features/make-it-natural/api";
import { MakeItNaturalFormValues } from "../api/zod-schema";
import { useToastHook } from "@/shared/toast";
import { KeyboardEvent } from "react";
export const MakeItNatural = () => {
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

  if (!hasMounted) return null;

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();

      handleSubmit(handleMakeItNatural)();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleMakeItNatural)}>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <FormControl isInvalid={!!errors.text}>
            <Textarea
              placeholder="Enter your text here"
              minH="150px"
              {...register("text")}
              onKeyDown={handleKeyDown}
              ref={(e) => {
                register("text").ref(e);
                inputRef.current = e;
              }}
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
              minH="40px"
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
            <Checkbox
              onChange={() => setIsAutoCopy(!isAutoCopy)}
              isChecked={isAutoCopy}
            >
              Auto copy
            </Checkbox>
            <Button
              background="none"
              borderRadius="md"
              _hover={{ background: "none" }}
              alignSelf="flex-start"
              onClick={handleCopyResult}
            >
              <Box mr="2">{isCopied ? <FaCheck /> : <FaRegCopy />}</Box>
              <Text>{isCopied ? "Copied" : "Copy"}</Text>
            </Button>
          </HStack>
          <FormControl>
            <Textarea
              placeholder="Result"
              minH="3xs"
              ref={(e) => {
                register("result").ref(e);
                resultRef.current = e;
              }}
              readOnly
            />
          </FormControl>
        </VStack>
      </form>
    </>
  );
};
