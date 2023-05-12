import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

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
      <Textarea rows={3} required {...register("content")} />
      <Button type="submit" alignSelf="end" size="sm" colorScheme="green" isDisabled={loading}>
        Post
      </Button>
    </Stack>
  );
};
