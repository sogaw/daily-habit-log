import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type TweetCreateFormType = {
  content: string;
};

export const TweetCreateForm = () => {
  const { register, handleSubmit } = useForm<TweetCreateFormType>();

  return (
    <Stack as="form">
      <Textarea rows={3} required {...register("content")} />
      <Button type="submit" alignSelf="end" size="sm" colorScheme="green">
        Post
      </Button>
    </Stack>
  );
};
