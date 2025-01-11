import { TranslationContainer } from "@/features";
import { Box, Link, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
const Home = () => {
  return (
    <Box>
      <Heading as="h1" size="lg" mb="4">
        Trilingual Translator
      </Heading>
      <Box mb="1">
        <Link as={NextLink} href="/make-it-natural" color="blue.500">
          Make it natural page
        </Link>
      </Box>
      <TranslationContainer />
    </Box>
  );
};

export default Home;
