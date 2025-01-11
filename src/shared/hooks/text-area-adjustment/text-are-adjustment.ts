import { useRef } from "react";

export const useTextAreaAdjustment = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustResultHeight = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  return {
    inputRef,
    resultRef,
    adjustResultHeight,
  };
};
