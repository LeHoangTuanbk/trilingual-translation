import { Text, Hide } from "@chakra-ui/react";
export const CannotCopy = () => {
  return (
    <Hide above="md">
      <Text fontSize="sm">
        ※On some mobile devices, the auto copy function may not work. You need
        to copy the text manually.
      </Text>
    </Hide>
  );
};
