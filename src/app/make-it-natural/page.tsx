import {
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  Select,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { Languages } from "@/utils";
export default function MakeItNaturalPage() {
  return (
    <Box p={5}>
      <form>
        <VStack mb="4" gap="4" alignItems="flex-start" w="100%">
          <Heading as="h1" size="lg">
            Make it natural
          </Heading>
          <Text>
            This tool is designed to help you make your text more natural like
            native speakers writings.
          </Text>
          <Textarea placeholder="Enter your text here" height="3xs" />
          <Select mr="4" w="fit-content" minW="300px">
            {Object.values(Languages).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Select>
          <Text>Context of the text</Text>
          <Textarea placeholder="Enter context here" height="100px" />
          <Button type="submit">Make it natural</Button>
          <Text>Result</Text>
          <Checkbox>Auto copy</Checkbox>
          <Textarea placeholder="Result" height="3xs" />
        </VStack>
      </form>
    </Box>
  );
}
