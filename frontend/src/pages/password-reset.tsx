import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useTryFn } from "@/hooks/use-try-fn";

type PasswordResetForm = {
  email: string;
};

const PasswordReset = Guard("BeforeAuth", () => {
  const toast = useAppToast();
  const { register, handleSubmit } = useForm<PasswordResetForm>();

  const [onSubmit, { loading }] = useTryFn(
    async (v: PasswordResetForm) => {
      await sendPasswordResetEmail(getAuth(), v.email);
    },
    {
      onCompleted: () => toast.success("Sended."),
      onError: (e) => {
        console.error(e);
        toast.error();
      },
    }
  );

  return (
    <AuthLayout>
      <Stack>
        <Box fontWeight="bold" fontSize="xl" textAlign="center">
          Password Reset
        </Box>

        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" required {...register("email")} />
          <Button type="submit" isDisabled={loading}>
            Post
          </Button>
          <Link to="/sign-in" style={{ alignSelf: "end" }}>
            to sign in
          </Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
});

export default PasswordReset;
