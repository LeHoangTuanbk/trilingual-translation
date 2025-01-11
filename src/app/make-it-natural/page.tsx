import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { MakeItNaturalContainer } from "@/features/make-it-natural";
export default function MakeItNaturalPage() {
  return (
    <Box p={5}>
      <Box mb="4">
        <Heading as="h1" size="lg" mb="4">
          Make it natural
        </Heading>
        <VStack alignItems="flex-start" gap="1">
          <Text>
            This tool is designed to make your text sound more natural, like the
            writing of native speakers
          </Text>
          <Text fontSize="sm">
            Shortcut: type and press Ctrl+Enter (or Cmd+Enter) to make it
            natural
          </Text>
        </VStack>
      </Box>
      <MakeItNaturalContainer />
    </Box>
  );
}
