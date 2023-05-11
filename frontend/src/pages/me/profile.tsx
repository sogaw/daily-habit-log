import { gql, useMutation } from "@apollo/client";
import { Button, Container, FormControl, FormLabel, HStack, Input, Link, Stack } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";
import { uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";

import { AppAvatar } from "@/components/AppAvatar";
import { Layout } from "@/components/Layout";
import { UpdateProfileDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useImageInput } from "@/hooks/use-image-input";
import { useTryFn } from "@/hooks/use-try-fn";
import { userIconPath, userIconRef } from "@/lib/fire-storage";
import { useMe } from "@/providers/me";

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

const SettingsProfile = Guard("AfterOnboard", () => {
  const toast = useAppToast();
  const { me } = useMe();
  const { register, handleSubmit } = useForm<UpdateProfileForm>({ defaultValues: { name: me.name } });
  const iconInput = useImageInput({ defaultImageUrl: me.iconUrl || undefined });

  const [updateProfile] = useMutation(UpdateProfileDocument);

  const [onSubmit, { loading }] = useTryFn(
    async (v: UpdateProfileForm) => {
      if (iconInput.file) {
        const compressed = await imageCompression(iconInput.file, { maxSizeMB: 1 });
        await uploadBytes(userIconRef(me.id), compressed);
        await updateProfile({ variables: { input: { name: v.name, iconPath: userIconPath(me.id) } } });
        return;
      }

      const iconPath = iconInput.imageUrl ? userIconPath(me.id) : "";
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
    <Layout title="Profile" backPath="/home">
      <Container maxW="md">
        <Stack spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit" isDisabled={loading}>
            Post
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
});

export default SettingsProfile;
