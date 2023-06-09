import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Link, Stack } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";
import { getAuth, signOut } from "firebase/auth";
import { uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";

import { AppAvatar } from "@/components/AppAvatar";
import { AuthLayout } from "@/components/AuthLayout";
import { Guard } from "@/hocs/guard";
import { useOnboard } from "@/hooks/auth/use-onboard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useImageInput } from "@/hooks/use-image-input";
import { useTryFn } from "@/hooks/use-try-fn";
import { userIconPath, userIconRef } from "@/lib/fire-storage";
import { useAuth } from "@/providers/auth";

type OnboardForm = {
  name: string;
};

const Onboard = Guard("BeforeOnboard", () => {
  const toast = useAppToast();
  const { authUser } = useAuth();
  const { register, handleSubmit } = useForm<OnboardForm>();
  const iconInput = useImageInput();

  const { onboard } = useOnboard();

  const [onSubmit, { loading }] = useTryFn(
    async (v: OnboardForm) => {
      if (iconInput.file) {
        const compressed = await imageCompression(iconInput.file, { maxSizeMB: 1 });
        await uploadBytes(userIconRef(authUser.uid), compressed);
        await onboard({ variables: { input: { name: v.name, iconPath: userIconPath(authUser.uid) } } });
        return;
      }

      await onboard({ variables: { input: { name: v.name, iconPath: "" } } });
    },
    {
      onCompleted: () => toast.success("Onboard."),
      onError: (e) => {
        console.error(e);
        toast.error();
      },
    }
  );

  const onSignOut = async () => {
    await signOut(getAuth());
    location.href = "/";
  };

  return (
    <AuthLayout>
      <Stack>
        <Box fontWeight="bold" fontSize="xl" textAlign="center">
          Onboard
        </Box>

        <Stack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Box>{authUser.email}</Box>
          </FormControl>

          <FormControl>
            <FormLabel>Icon</FormLabel>
            <Input type="file" accept="image/*" display="none" ref={iconInput.ref} onChange={iconInput.onChange} />
            <Stack>
              <AppAvatar alignSelf="center" src={iconInput.imageUrl} />
              {iconInput.imageUrl ? (
                <HStack alignSelf="start">
                  <Link onClick={iconInput.onClick}>change</Link>
                  <Link onClick={() => iconInput.reset()}>delete</Link>
                </HStack>
              ) : (
                <Link alignSelf="start" onClick={iconInput.onClick}>
                  add
                </Link>
              )}
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" required {...register("name")} placeholder="Name" />
          </FormControl>

          <Flex direction="column">
            <Button type="submit" isDisabled={loading}>
              Post
            </Button>
            <Link onClick={onSignOut}>sign out</Link>
          </Flex>
        </Stack>
      </Stack>
    </AuthLayout>
  );
});

export default Onboard;
