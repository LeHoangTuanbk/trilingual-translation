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
import { MakeItNaturalProps } from "./props";

export const MakeItNatural = ({ isPending, ...props }: MakeItNaturalProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
        <FormControl isInvalid={!!props.errors.text}>
          <Textarea
            placeholder="Enter your text here"
            minH="150px"
            {...props.register("text")}
            onKeyDown={props.onKeyDown}
            ref={(e) => {
              props.register("text").ref(e);
              props.inputRef.current = e;
            }}
          />
          {props.errors.text && (
            <FormErrorMessage>{props.errors.text.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <FormLabel>Model</FormLabel>
            <Select
              {...props.register("selectedModel")}
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
            {...props.register("context")}
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
            {...props.register("language")}
            isInvalid={!!props.errors.language}
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
            onChange={props.onAutoCopyChange}
            isChecked={props.isAutoCopy}
          >
            Auto copy
          </Checkbox>
          <Button
            background="none"
            borderRadius="md"
            _hover={{ background: "none" }}
            alignSelf="flex-start"
            onClick={props.onCopyResult}
          >
            <Box mr="2">{props.isCopied ? <FaCheck /> : <FaRegCopy />}</Box>
            <Text>{props.isCopied ? "Copied" : "Copy"}</Text>
          </Button>
        </HStack>
        <FormControl>
          <Textarea
            placeholder="Result"
            minH="3xs"
            value={isPending ? "Loading..." : undefined}
            ref={(e) => {
              props.register("result").ref(e);
              props.resultRef.current = e;
            }}
            readOnly
          />
        </FormControl>
      </VStack>
    </form>
  );
};
