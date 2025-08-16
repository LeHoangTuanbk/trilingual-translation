import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";
import { MakeItNaturalContainer } from "@/features/make-it-natural";
import NextLink from "next/link";
export default function MakeItNaturalPage() {
  return (
    <Box>
      <Box mb="4">
        <Heading as="h1" size="lg" mb="4">
          Make it natural
        </Heading>
        <Box mb="1">
          <Link as={NextLink} href="/" color="blue.500">
            Back to home
          </Link>
        </Box>
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
