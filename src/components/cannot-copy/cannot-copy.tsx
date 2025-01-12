"use client";
import { Text, Box } from "@chakra-ui/react";
import { isMobileDevice } from "@/utils";
import { useState, useEffect } from "react";
export const CannotCopy = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(!!isMobileDevice());
  }, []);
  return (
    <Box display={isMobile ? "block" : "none"}>
      <Text fontSize="sm">
        ※On some mobile devices, the auto copy function may not work. You need
        to copy the text manually.
      </Text>
    </Box>
  );
};
