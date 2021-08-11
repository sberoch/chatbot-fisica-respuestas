import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

type toastType = "ERROR" | "SUCCESS" | "INFO" | "WARNING";
interface ToastProps extends UseToastOptions {
  type: toastType;
}

const toastShapes: Record<toastType, UseToastOptions> = {
  ERROR: { status: "error", duration: 4000, isClosable: true },
  SUCCESS: { status: "success", duration: 4000, isClosable: true },
  INFO: { status: "info", duration: 4000, isClosable: true },
  WARNING: { status: "warning", duration: 4000, isClosable: true },
};

export const Toast = ({ type, ...props }: ToastProps) => {
  /**
   * @description Chakra.toast as standalone and fixed shapes
   */
  const toast = createStandaloneToast();
  toast.closeAll();
  toast({ ...toastShapes[type], ...props });
};