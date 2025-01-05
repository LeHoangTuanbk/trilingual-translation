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
import { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import { Languages } from "@/utils";

type TranslationPresenterProps = {
  input: string;
  english: string;
  vietnamese: string;
  selectedModel: string;
  isLoading: boolean;
  models: string[];
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLTextAreaElement>) => void;
  onModelChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTranslate: (text: string) => void;
  originalLanguage: string;
};

export const Translation = ({
  input,
  english,
  vietnamese,
  selectedModel,
  isLoading,
  models,
  onInputChange,
  onKeyDown,
  onPaste,
  onModelChange,
  onTranslate,
  onLanguageChange,
  originalLanguage,
}: TranslationPresenterProps) => {
  return (
    <Box padding="5">
      <Heading as="h1" size="lg" mb="4">
        Trilingual Translator
      </Heading>
      <Heading as="h2" size="md" mb="2" w="100%">
        <Box display="flex" alignItems="center" gap="2">
          <Text>Original Language</Text>
          <Select onChange={onLanguageChange} value={originalLanguage} w="10%">
            {Object.values(Languages).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
        </Box>
      </Heading>
      <Textarea
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder="Enter your Japanese paragraph here"
        height="xs"
        mb="4"
      />
      <Text fontSize="sm" mb="4">
        Paste or press Ctrl+Enter (or Cmd+Enter) to translate
      </Text>
      <Flex align="center" mb="4" w="30%">
        <Select value={selectedModel} onChange={onModelChange} flex="1" mr="4">
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="blackAlpha"
          onClick={() => onTranslate(input)}
          disabled={isLoading}
        >
          Translate
        </Button>
      </Flex>
      <Flex direction="row" gap="4">
        <Box width="50%">
          <Heading as="h2" size="md" mb="2">
            English
          </Heading>
          <Textarea value={english} readOnly height="xs" />
        </Box>
        <Box width="50%">
          <Heading as="h2" size="md" mb="2">
            Vietnamese
          </Heading>
          <Textarea value={vietnamese} readOnly height="xs" />
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
    </Box>
  );
};
