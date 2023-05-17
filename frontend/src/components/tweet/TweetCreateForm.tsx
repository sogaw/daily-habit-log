import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { AutoResizeTextarea } from "@/components/AutoResizeTextarea";
import { useCreateTweet } from "@/hooks/tweet/use-create-tweet";

type TweetCreateFormType = {
  content: string;
};

export const TweetCreateForm = () => {
  const { createTweet, loading } = useCreateTweet();

  const { register, handleSubmit, reset } = useForm<TweetCreateFormType>();

  const onSubmit = async (v: TweetCreateFormType) => {
    await createTweet({ variables: { input: v } });
    reset();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <AutoResizeTextarea minRows={3} required {...register("content")} />
      <Button type="submit" alignSelf="end" size="sm" colorScheme="green" isDisabled={loading}>
        Post
      </Button>
    </Stack>
  );
};
