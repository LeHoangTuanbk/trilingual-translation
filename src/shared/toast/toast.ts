import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

import { ToastTypeConst, ToastType } from "./data.types";
import { DefaultMessages, DefaultPosition } from "./default-options";

export const useToastHook = () => {
  const toast = useToast();

  const createToast = useCallback(
    (type: ToastType, message: string, description?: string) => {
      const options = {
        title:
          message ||
          (type === ToastTypeConst.Error
            ? DefaultMessages.Error
            : DefaultMessages.Success),
        status: type,
        position: DefaultPosition,
        isClosable: true,
        description,
      };
      toast(options);
    },
    [toast]
  );

  const errorToast = (message: string, description?: string) =>
    createToast(ToastTypeConst.Error, message, description);
  const successToast = (message: string, description?: string) =>
    createToast(ToastTypeConst.Success, message, description);

  return { errorToast, successToast };
};
