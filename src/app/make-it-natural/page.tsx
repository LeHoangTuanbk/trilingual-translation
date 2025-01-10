"use client";

import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  Select,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { Languages } from "@/utils";
import { useEffect, useState } from "react";
export default function MakeItNaturalPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Box p={5}>
      {/* Todo: need to add form control, form label, form error here */}
      <form>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <Heading as="h1" size="lg">
            Make it natural
          </Heading>
          <Box>
            <Text>
              This tool is designed to make your text sound more natural, like
              the writing of native speakers
            </Text>
            <Text fontSize="sm">
              Paste or type and press Ctrl+Enter (or Cmd+Enter) to make it
              natural
            </Text>
          </Box>

          <FormControl>
            <Textarea placeholder="Enter your text here" height="150px" />
          </FormControl>

          <FormControl>
            <FormLabel>Context of the text</FormLabel>
            <Textarea placeholder="Enter context here" height="50px" />
          </FormControl>
          <HStack>
            <Text>Your text is in</Text>
            <Select mr="4" w="fit-content" minW="300px">
              {Object.values(Languages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
            <Button type="submit">Make it natural</Button>
          </HStack>
          <HStack gap="4">
            <Text>Result</Text>
            <Checkbox>Auto copy</Checkbox>
          </HStack>
          <FormControl>
            <Textarea placeholder="Result" height="3xs" />
          </FormControl>
        </VStack>
      </form>
    </Box>
  );
}
