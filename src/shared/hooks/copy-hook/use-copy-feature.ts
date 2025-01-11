import { useState } from "react";

import { useToastHook } from "@/shared/toast";
import { isMobileDevice } from "@/utils";

export const useCopyFeature = (result: string) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCopy, setIsAutoCopy] = useState(!isMobileDevice());
  const { errorToast } = useToastHook();

  const handleCopyResult = async () => {
    // Todo: need to refactor the copy feature
    if (!navigator.clipboard.writeText) {
      errorToast(
        "Cannot automatically copy to clipboard. Please copy manually."
      );
      return;
    }
    setIsCopied(true);
    await navigator.clipboard.writeText(result || "");
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
