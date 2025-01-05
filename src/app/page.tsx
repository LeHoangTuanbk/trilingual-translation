"use client";
import {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  useCallback,
} from "react";

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

import axios from "axios";
import { MODELS, DEFAULT_MODEL } from "@/utils";

const Home = () => {
  const [input, setInput] = useState("");
  const [english, setEnglish] = useState("");
  const [vietnamese, setVietnamese] = useState("");
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = useCallback(
    async (textToTranslate: string) => {
      if (!textToTranslate.trim()) {
        setInput("");
        setEnglish("");
        setVietnamese("");
        return;
      }

      setIsLoading(true);
      setEnglish("Loading...");
      setVietnamese("Loading...");
      try {
        const res = await axios.post("/api/translate", {
          japaneseText: textToTranslate,
          model: selectedModel,
        });
        const { english: translatedEnglish, vietnamese: translatedVietnamese } =
          res.data.result || {};
        if (translatedEnglish && translatedVietnamese) {
          setEnglish(translatedEnglish);
          setVietnamese(translatedVietnamese);
        } else {
          setEnglish("");
          setVietnamese("");
          console.error("Translation data is missing or incomplete.");
        }
      } catch (error) {
        console.error("Translation Error:", error);
        setEnglish(
          "Error occurred during translation. Please try again later or choose another model."
        );
        setVietnamese(
          "Error occurred during translation. Please try again later or choose another model."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [selectedModel]
  );

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate(input);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setInput(pastedText);
    handleTranslate(pastedText);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <Box padding="5">
      <Heading as="h1" size="lg" mb="4">
        Trilingual Translator
      </Heading>
      <Heading as="h2" size="md" mb="2">
        Japanese
      </Heading>
      <Textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder="Enter your Japanese paragraph here"
        height="xs"
        mb="4"
      />
      <Text fontSize="sm" mb="4">
        Paste or press Ctrl+Enter (or Cmd+Enter) to translate
      </Text>
      <Flex align="center" mb="4" w="30%">
        <Select
          value={selectedModel}
          onChange={handleModelChange}
          flex="1"
          mr="4"
        >
          {MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </Select>
        <Button
          colorScheme="blackAlpha"
          onClick={() => handleTranslate(input)}
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

export default Home;
