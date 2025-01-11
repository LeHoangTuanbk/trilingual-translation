import { useState } from "react";

export const useCopyFeature = (result: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCopy, setIsAutoCopy] = useState(true);

  const handleCopyResult = async () => {
    if (navigator.clipboard) {
      setIsCopied(true);
      await navigator.clipboard.writeText(result || "");
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return {
    isCopied,
    isAutoCopy,
    handleCopyResult,
    setIsAutoCopy,
  };
};
