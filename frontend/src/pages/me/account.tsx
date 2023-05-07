import { gql, useMutation } from "@apollo/client";
import { Box, Button, Container, Divider, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";

import { Layout } from "@/components/Layout";
import { DeleteAccountDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { assertIsDefined } from "@/lib/assert-is-defined";
import { useMe } from "@/providers/auth";

gql`
  mutation deleteAccount {
    deleteAccount
  }
`;

const SettingsAccount = Guard("WithOnboard", () => {
  const toast = useAppToast();
  const { authUser } = useMe();

  const onResetPassword = async () => {
    assertIsDefined(authUser.email);
    await sendPasswordResetEmail(getAuth(), authUser.email);
    toast.success("Sended.");
  };

  const [deleteAccount] = useMutation(DeleteAccountDocument, {
    onCompleted: async () => {
      await signOut(getAuth());
      location.href = "/";
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

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
            <Button w="full" variant="outline" onClick={onResetPassword}>
              Reset password
            </Button>
          </FormControl>

          <Divider />

          <FormControl>
            <FormLabel>Caution</FormLabel>
            <Button w="full" colorScheme="red" variant="outline" onClick={onDeleteAccount}>
              Delete account
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </Layout>
  );
});

export default SettingsAccount;
