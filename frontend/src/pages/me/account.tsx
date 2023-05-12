import { Box, Button, Container, Divider, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Layout } from "@/components/Layout";
import { Guard } from "@/hocs/guard";
import { useDeleteAccount } from "@/hooks/auth/use-delete-account";
import { useAppToast } from "@/hooks/use-app-toast";
import { useTryFn } from "@/hooks/use-try-fn";
import { assertIsDefined } from "@/lib/assert-is-defined";
import { useAuth } from "@/providers/auth";

const SettingsAccount = Guard("AfterOnboard", () => {
  const toast = useAppToast();
  const { authUser } = useAuth();

  const [onResetPassword, { loading: resetPasswordLoading }] = useTryFn(
    async () => {
      assertIsDefined(authUser.email);
      await sendPasswordResetEmail(getAuth(), authUser.email);
    },
    {
      onCompleted: () => toast.success("Sended."),
      onError: (e) => {
        console.error(e);
        toast.error();
      },
    }
  );

  const { deleteAccount, loading: deleteAccountLoading } = useDeleteAccount();

  const onDeleteAccount = async () => {
    if (confirm("Are you sure?")) await deleteAccount();
  };

  return (
    <Layout title="Account" backPath="/home">
      <Container maxW="md">
        <Stack spacing="6">
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Box>{authUser.uid}</Box>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Box>{authUser.email}</Box>
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Button w="full" variant="outline" onClick={() => onResetPassword()} isDisabled={resetPasswordLoading}>
              Reset password
            </Button>
          </FormControl>

          <Divider />

          <FormControl>
            <FormLabel>Caution</FormLabel>
            <Button
              w="full"
              colorScheme="red"
              variant="outline"
              onClick={onDeleteAccount}
              isDisabled={deleteAccountLoading}
            >
              Delete account
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </Layout>
  );
});

export default SettingsAccount;
