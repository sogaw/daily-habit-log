import { useToast, UseToastOptions } from "@chakra-ui/react";

export const useAppToast = () => {
  const toast = useToast();

  return {
    success: (title: string, options?: UseToastOptions) => {
      toast({ status: "success", position: "top-right", isClosable: true, title, ...options });
    },
    error: (title = "Error happened.", options?: UseToastOptions) => {
      toast({ status: "error", position: "top-right", isClosable: true, title, ...options });
    },
  };
};
