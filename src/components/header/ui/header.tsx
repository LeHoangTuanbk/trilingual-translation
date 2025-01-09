import { Box, Text, Link } from "@chakra-ui/react";
export const Header = () => {
  return (
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
  );
};
