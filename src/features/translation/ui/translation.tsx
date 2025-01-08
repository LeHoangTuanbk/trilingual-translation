import {
  Box,
  Button,
  Textarea,
  Select,
  Text,
  Link,
  Heading,
  Flex,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ClipboardEvent,
  FormEventHandler,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { Languages, TranslationModeKeysType } from "@/utils";
import type { TranslationFormValues } from "@/features/translation/api";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { TranslationMode } from "@/utils";

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
  translation1: string;
  translation2: string;
  translation1Ref: React.RefObject<HTMLTextAreaElement>;
  translation2Ref: React.RefObject<HTMLTextAreaElement>;
  onLanguageShortcut: (mode: TranslationModeKeysType) => void;
  onAutoCopyChange1: (checked: boolean) => void;
  isAutoCopy1: boolean;
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
  translation1,
  translation2,
  translation1Ref,
  translation2Ref,
  onLanguageShortcut,
  onAutoCopyChange1,
  isAutoCopy1,
}: TranslationPresenterProps) => {
  const [isCopied1, setIsCopied1] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);

  const handleCopy = async (
    ref: React.RefObject<HTMLTextAreaElement>,
    setCopied: (value: boolean) => void
  ) => {
    if (ref.current) {
      await navigator.clipboard.writeText(ref.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      const modifierKey = isMac ? e.metaKey : e.ctrlKey;
      if (modifierKey) {
        onLanguageShortcut(e.key as TranslationModeKeysType);
        if (TranslationMode[e.key as TranslationModeKeysType]) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onLanguageShortcut]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return (
    <Box padding="5">
      <form onSubmit={onSubmit}>
        <Heading as="h1" size="lg" mb="4">
          Trilingual Translator
        </Heading>

        <Heading as="h2" size="md" mb="2" w="100%">
          <Box display="flex" alignItems="center" gap="2">
            <Text>Original Language</Text>
            <Select
              {...register("originalLanguage")}
              w="fit-content"
              minW="150px"
            >
              {Object.values(Languages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
          </Box>
        </Heading>
        <Text>Translation mode:</Text>
        <Text fontSize="sm" mb="4">
          Ctrl (Cmd) + 1: Japanese, Ctrl (Cmd) + 2: Vietnamese, Ctrl (Cmd) + 3:
          English
        </Text>

        <Textarea
          {...register("input")}
          value={input}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          placeholder="Enter your paragraph here"
          height="3xs"
          mb="2"
          ref={(e) => {
            register("input").ref(e);
            inputRef.current = e;
          }}
        />
        {errors.input && (
          <Text color="red.500" mb="2">
            {errors.input.message}
          </Text>
        )}

        <Text fontSize="sm" mb="4">
          Paste or press Ctrl+Enter (or Cmd+Enter) to translate
        </Text>

        <Stack direction={{ base: "column", md: "row" }} mb="4" w="30%" gap="4">
          <Select
            {...register("selectedModel")}
            value={selectedModel}
            mr="4"
            w="fit-content"
            minW="300px"
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </Select>

          <Button
            type="submit"
            colorScheme="blackAlpha"
            disabled={isLoading}
            w="fit-content"
            minW="150px"
          >
            {isLoading ? <Text>Translating</Text> : <Text>Translate</Text>}
          </Button>
        </Stack>

        <Heading as="h2" size="md" mb="2">
          Targeted Language
        </Heading>

        <Flex direction="row" gap="4">
          <Box width="50%">
            <Text as="h2" size="md" mb="2">
              <Stack
                direction={{ base: "column", md: "row" }}
                width="100%"
                spacing={{ base: 2, md: 4 }}
                align={{ base: "start", md: "center" }}
              >
                <Select
                  {...register("targetedLanguage1")}
                  w={{ base: "100%", md: "fit-content" }}
                  minW="150px"
                >
                  {Object.values(Languages).map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
                <Button
                  background="none"
                  borderRadius="md"
                  _hover={{ background: "none" }}
                  onClick={() => handleCopy(translation1Ref, setIsCopied1)}
                  alignSelf="flex-start"
                  w="auto"
                >
                  <Box mr="2">{isCopied1 ? <FaCheck /> : <FaRegCopy />}</Box>
                  <Text>{isCopied1 ? "Copied" : "Copy"}</Text>
                </Button>
                <Checkbox
                  onChange={() => onAutoCopyChange1(!isAutoCopy1)}
                  defaultChecked={isAutoCopy1}
                >
                  Auto copy
                </Checkbox>
              </Stack>
            </Text>
            {errors.targetedLanguage1 && (
              <Text color="red.500" mb="2">
                {errors.targetedLanguage1.message}
              </Text>
            )}
            <Textarea
              value={translation1}
              readOnly
              minHeight="xs"
              height="auto"
              ref={translation1Ref}
            />
          </Box>

          <Box width="50%">
            <Text as="h2" size="md" mb="2">
              <Stack
                direction={{ base: "column", md: "row" }}
                width="100%"
                spacing={{ base: 2, md: 4 }}
                align={{ base: "start", md: "center" }}
              >
                <Select
                  {...register("targetedLanguage2")}
                  w={{ base: "100%", md: "fit-content" }}
                  minW="150px"
                >
                  {Object.values(Languages).map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
                <Button
                  background="none"
                  borderRadius="md"
                  _hover={{ background: "none" }}
                  onClick={() => handleCopy(translation2Ref, setIsCopied2)}
                  w="auto"
                  alignSelf="flex-start"
                >
                  <Box mr="2">{isCopied2 ? <FaCheck /> : <FaRegCopy />}</Box>
                  <Text>{isCopied2 ? "Copied" : "Copy"}</Text>
                </Button>
              </Stack>
            </Text>
            {errors.targetedLanguage2 && (
              <Text color="red.500" mb="2">
                {errors.targetedLanguage2.message}
              </Text>
            )}
            <Textarea
              value={translation2}
              readOnly
              minHeight="xs"
              height="auto"
              ref={translation2Ref}
            />
          </Box>
        </Flex>
        {/* Todo: need to refactor this footer */}
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
