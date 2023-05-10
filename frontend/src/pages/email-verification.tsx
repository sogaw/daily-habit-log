import { Box, Button, HStack, Link, VStack } from "@chakra-ui/react";
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";

import { AuthLayout } from "@/components/AuthLayout";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useTryFn } from "@/hooks/use-try-fn";
import { useAuth } from "@/providers/auth";

const EmailVerification = Guard("BeforeEmailVerify", () => {
  const toast = useAppToast();
  const { authUser } = useAuth();

  const [onSend, { loading }] = useTryFn(
    async () => {
      await sendEmailVerification(authUser);
    },
    {
      onCompleted: () => toast.success("Sended."),
      onError: (e) => {
        console.error(e);
        toast.error();
      },
    }
  );

  const onReload = () => {
    location.href = "/";
  };

  const onSignOut = async () => {
    await signOut(getAuth());
    location.href = "/";
  };

  return (
    <AuthLayout>
      <VStack>
        <Box fontWeight="bold" fontSize="xl">
          Email Verification
        </Box>
        <Box>{authUser.email}</Box>
        <Button onClick={() => onSend()} isDisabled={loading}>
          Verify Email
        </Button>
        <HStack>
          <Link onClick={onReload}>reload</Link>
          <Box>/</Box>
          <Link onClick={onSignOut}>sign out</Link>
        </HStack>
      </VStack>
    </AuthLayout>
  );
});

export default EmailVerification;
