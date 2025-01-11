import {
  Box,
  Button,
  Textarea,
  Select,
  Text,
  Heading,
  Flex,
  Stack,
  Checkbox,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Languages } from "@/utils";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { TranslationPresenterProps } from "./props";

export const Translation = ({ ...props }: TranslationPresenterProps) => {
  // Todo: need to refactor: group props, divide into smaller components
  const {
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
    onAutoCopyChange1,
    isAutoCopy1,
    isCopied1,
    isCopied2,
    setIsCopied1,
    setIsCopied2,
    handleCopy,
    inputRef,
  } = props;

  return (
    <Box mb={4}>
      <form onSubmit={onSubmit}>
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
        <FormControl isInvalid={!!errors.input}>
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
          <FormErrorMessage mb="2">
            {errors.input && errors.input.message}
          </FormErrorMessage>
        </FormControl>

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
                <Checkbox
                  onChange={() => onAutoCopyChange1(!isAutoCopy1)}
                  defaultChecked={isAutoCopy1}
                >
                  Auto copy
                </Checkbox>
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
                <Checkbox visibility="hidden" isDisabled>
                  Auto copy
                </Checkbox>
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
      </form>
    </Box>
  );
};
