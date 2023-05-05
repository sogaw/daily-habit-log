import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useTryFn } from "@/hooks/use-try-fn";

type SignInForm = {
  email: string;
  password: string;
};

const SignIn = Guard("SignInUpPage", () => {
  const toast = useAppToast();
  const { register, handleSubmit } = useForm<SignInForm>();

  const [onSubmit, { loading }] = useTryFn(
    async (v: SignInForm) => {
      await signInWithEmailAndPassword(getAuth(), v.email, v.password);
    },
    {
      onCompleted: () => toast.success("Signed in."),
      onError: (e) => {
        console.error(e), toast.error();
      },
    }
  );

  return (
    <AuthLayout>
      <Stack>
        <Box fontWeight="bold" fontSize="xl" textAlign="center">
          Sign In
        </Box>

        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" required {...register("email")} />
          <Input type="password" placeholder="Password" required {...register("password")} />
          <Button type="submit" isDisabled={loading}>
            Post
          </Button>
          <Link to="/sign-up" style={{ alignSelf: "end" }}>
            to sign up
          </Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
});

export default SignIn;
