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
import { Languages, MODELS } from "@/utils";
import { FaRegCopy, FaCheck } from "react-icons/fa6";

import { MakeItNaturalFormValues } from "../api/zod-schema";
import { KeyboardEvent } from "react";
import { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

type MakeItNaturalProps = {
  register: UseFormRegister<MakeItNaturalFormValues>;
  errors: FieldErrors<MakeItNaturalFormValues>;
  isPending: boolean;
  isAutoCopy: boolean;
  isCopied: boolean;
  inputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  resultRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onCopyResult: () => void;
  onAutoCopyChange: () => void;
};

export const MakeItNatural = ({
  register,
  errors,
  isPending,
  isAutoCopy,
  isCopied,
  inputRef,
  resultRef,
  onSubmit,
  onKeyDown,
  onCopyResult,
  onAutoCopyChange,
}: MakeItNaturalProps) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <FormControl isInvalid={!!errors.text}>
            <Textarea
              placeholder="Enter your text here"
              minH="150px"
              {...register("text")}
              onKeyDown={onKeyDown}
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
            <Checkbox onChange={onAutoCopyChange} isChecked={isAutoCopy}>
              Auto copy
            </Checkbox>
            <Button
              background="none"
              borderRadius="md"
              _hover={{ background: "none" }}
              alignSelf="flex-start"
              onClick={onCopyResult}
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
