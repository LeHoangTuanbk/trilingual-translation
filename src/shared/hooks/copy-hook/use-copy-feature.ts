import { useState } from "react";
import { isMobileDevice } from "@/utils";
export const useCopyFeature = (result: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCopy, setIsAutoCopy] = useState(!isMobileDevice());

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
