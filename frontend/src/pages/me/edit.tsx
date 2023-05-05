import { gql, useMutation } from "@apollo/client";
import { Box, Button, Container, HStack, Input, Link, Stack } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";

import { AppAvatar } from "@/components/AppAvatar";
import { Layout } from "@/components/Layout";
import { UpdateProfileDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useImageInput } from "@/hooks/use-image-input";
import { useTryFn } from "@/hooks/use-try-fn";
import { useMe } from "@/providers/auth";

gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      ...Me
    }
  }
`;

type UpdateProfileForm = {
  name: string;
};

const MeEdit = Guard("WithOnboard", () => {
  const toast = useAppToast();
  const { authUser, me } = useMe();
  const { register, handleSubmit } = useForm<UpdateProfileForm>({ defaultValues: { name: me.name } });
  const iconInput = useImageInput({ defaultImageUrl: me.iconUrl || undefined });

  const [updateProfile] = useMutation(UpdateProfileDocument);

  const [onSubmit, { loading }] = useTryFn(
    async (v: UpdateProfileForm) => {
      if (iconInput.file) {
        const compressed = await imageCompression(iconInput.file, { maxSizeMB: 1 });
        const file = await uploadBytes(ref(getStorage(), `users/${me.id}/icon`), compressed);
        await updateProfile({ variables: { input: { name: v.name, iconPath: file.ref.fullPath } } });
        return;
      }

      const iconPath = iconInput.imageUrl ? `users/${me.id}/icon` : null;
      await updateProfile({ variables: { input: { name: v.name, iconPath } } });
    },
    {
      onCompleted: () => toast.success("Updated profile."),
      onError: (e) => {
        console.error(e);
        toast.error();
      },
    }
  );

  return (
    <Layout title="Edit Profile" backPath="/home">
      <Container maxW="md">
        <Stack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Box fontWeight="semibold">Email</Box>
            <Box>{authUser.email}</Box>
          </Stack>

          <Stack>
            <Box fontWeight="semibold">Icon</Box>
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
          </Stack>

          <Stack>
            <Box fontWeight="semibold">Name</Box>
            <Input type="text" required {...register("name")} placeholder="Name" />
          </Stack>

          <Button type="submit" isDisabled={loading}>
            Post
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
});

export default MeEdit;
