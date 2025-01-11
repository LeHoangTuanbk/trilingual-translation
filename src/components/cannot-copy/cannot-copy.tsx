import { Text, Hide } from "@chakra-ui/react";
export const CannotCopy = () => {
  return (
    <Hide above="md">
      <Text fontSize="sm">
        ※On mobile devices, the copy function may not work. You may need to copy
        the text manually.
      </Text>
    </Hide>
  );
};
