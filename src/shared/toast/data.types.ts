export const ToastTypeConst = {
  Error: "error",
  Success: "success",
} as const;

export type ToastType = (typeof ToastTypeConst)[keyof typeof ToastTypeConst];
