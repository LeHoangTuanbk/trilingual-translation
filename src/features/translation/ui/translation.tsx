import {
  Box,
  Button,
  Textarea,
  Select,
  Text,
  Link,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ClipboardEvent, FormEventHandler, KeyboardEvent } from "react";
import { Languages } from "@/utils";
import type { TranslationFormValues } from "@/features/translation/api";

type TranslationPresenterProps = {
  register: UseFormRegister<TranslationFormValues>;
  errors: FieldErrors<TranslationFormValues>;
  input: string;
  selectedModel: string;
  isLoading: boolean;
  models: string[];
  onPaste: (e: ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  translation1Ref: React.RefObject<HTMLTextAreaElement | null>;
  translation2Ref: React.RefObject<HTMLTextAreaElement | null>;
};

export const Translation = ({
  register,
  errors,
  input,
  selectedModel,
  isLoading,
  models,

  onPaste,
  onKeyDown,
  onSubmit,
  translation1Ref,
  translation2Ref,
}: TranslationPresenterProps) => {
  return (
    <Box padding="5">
      <form onSubmit={onSubmit}>
        <Heading as="h1" size="lg" mb="4">
          Trilingual Translator
        </Heading>

        <Heading as="h2" size="md" mb="2" w="100%">
          <Box display="flex" alignItems="center" gap="2">
            <Text>Original Language</Text>
            <Select {...register("originalLanguage")} w="15%">
              {Object.values(Languages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
          </Box>
        </Heading>

        <Textarea
          {...register("input")}
          value={input}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          placeholder="Enter your paragraph here"
          height="3xs"
          mb="2"
        />
        {errors.input && (
          <Text color="red.500" mb="2">
            {errors.input.message}
          </Text>
        )}

        <Text fontSize="sm" mb="4">
          Paste or press Ctrl+Enter (or Cmd+Enter) to translate
        </Text>

        <Flex align="center" mb="4" w="30%">
          <Select
            {...register("selectedModel")}
            value={selectedModel}
            flex="1"
            mr="4"
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>

          <Button type="submit" colorScheme="blackAlpha" disabled={isLoading}>
            Translate
          </Button>
        </Flex>

        <Heading as="h2" size="md" mb="2">
          Targeted Language
        </Heading>

        <Flex direction="row" gap="4">
          <Box width="50%">
            <Heading as="h2" size="md" mb="2">
              <Select
                {...register("targetedLanguage1")}
                flex="1"
                mr="4"
                w="20%"
              >
                {Object.values(Languages).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </Select>
            </Heading>
            {errors.targetedLanguage1 && (
              <Text color="red.500" mb="2">
                {errors.targetedLanguage1.message}
              </Text>
            )}
            <Textarea
              {...register("translation1")}
              readOnly
              minHeight="xs"
              height="auto"
            />
          </Box>

          <Box width="50%">
            <Heading as="h2" size="md" mb="2">
              <Select
                {...register("targetedLanguage2")}
                flex="1"
                mr="4"
                w="20%"
              >
                {Object.values(Languages).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </Select>
            </Heading>
            {errors.targetedLanguage2 && (
              <Text color="red.500" mb="2">
                {errors.targetedLanguage2.message}
              </Text>
            )}
            <Textarea
              readOnly
              {...register("translation2")}
              minHeight="xs"
              height="auto"
            />
          </Box>
        </Flex>

        <Box as="footer" textAlign="center" mt="16" py="4">
          <Text>
            Developed by{" "}
            <Link
              href="https://www.linkedin.com/in/le-hoang-tuan-bk/"
              color="blue.500"
              fontWeight="medium"
              target="_blank"
            >
              Tuan Le Hoang
            </Link>
          </Text>
        </Box>
      </form>
    </Box>
  );
};
