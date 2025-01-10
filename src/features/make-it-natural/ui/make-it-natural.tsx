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
  Stack,
} from "@chakra-ui/react";
import { Languages } from "@/utils";
import { useEffect, useState } from "react";

export const MakeItNatural = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      <form>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <FormControl>
            <Textarea placeholder="Enter your text here" height="150px" />
          </FormControl>

          <FormControl>
            <FormLabel>Context of the text</FormLabel>
            <Textarea placeholder="Enter context here" height="50px" />
          </FormControl>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="4"
            justifyContent={{ base: "flex-start", md: "center" }}
            alignItems={{ base: "flex-start", md: "center" }}
          >
            <Text>Your text is in</Text>
            <Select mr="4" w="fit-content" minW="300px">
              {Object.values(Languages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
            <Button type="submit">Make it natural</Button>
          </Stack>
          <HStack gap="4">
            <Text>Result</Text>
            <Checkbox>Auto copy</Checkbox>
          </HStack>
          <FormControl>
            <Textarea placeholder="Result" height="3xs" />
          </FormControl>
        </VStack>
      </form>
    </>
  );
};
