import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useTryFn } from "@/hooks/use-try-fn";

type SignUpForm = {
  email: string;
  password: string;
  confirmation: string;
};

const SignUp = Guard("SignInUpPage", () => {
  const toast = useAppToast();
  const { register, handleSubmit } = useForm<SignUpForm>();

  const [onSubmit, { loading }] = useTryFn(
    async (v: SignUpForm) => {
      if (v.password != v.confirmation) return toast.error("Password and confirmation do not match.");
      await createUserWithEmailAndPassword(getAuth(), v.email, v.password);
    },
    {
      onCompleted: () => toast.success("Signed up."),
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
          Sign Up
        </Box>

        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" required {...register("email")} />
          <Input type="password" placeholder="Password" required {...register("password")} />
          <Input type="password" placeholder="Confirmation" required {...register("confirmation")} />
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

export default SignUp;
