import { useState } from "react";

import { useToastHook } from "@/shared/toast";

export const useCopyFeature = (result: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCopy, setIsAutoCopy] = useState(true);
  const { successToast } = useToastHook();

  const handleCopyResult = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(result || "");
    successToast("Copied to clipboard");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return {
    isCopied,
    isAutoCopy,
    handleCopyResult,
    setIsAutoCopy,
  };
};
