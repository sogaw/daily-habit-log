import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useCreateTweet } from "@/hooks/tweet/use-create-tweet";

type TweetCreateFormType = {
  content: string;
};

export const TweetCreateForm = () => {
  const { createTweet, loading } = useCreateTweet();

  const { register, handleSubmit, reset, watch } = useForm<TweetCreateFormType>();

  const content = watch("content", "");
  const contentLength = content.split("\n").length;
  const contentRows = Math.max(3, contentLength);

  const onSubmit = async (v: TweetCreateFormType) => {
    await createTweet({ variables: { input: v } });
    reset();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Textarea rows={contentRows} required {...register("content")} />
      <Button type="submit" alignSelf="end" size="sm" colorScheme="green" isDisabled={loading}>
        Post
      </Button>
    </Stack>
  );
};
