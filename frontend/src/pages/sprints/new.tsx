import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Layout } from "@/components/Layout";
import { Guard } from "@/hocs/guard";
import { useCreateSprint } from "@/hooks/sprint/use-create-sprint";

type SprintCreateForm = {
  name: string;
  description: string;
};

const SprintsNew = Guard("AfterOnboard", () => {
  const { createSprint, loading } = useCreateSprint();

  const { register, handleSubmit } = useForm<SprintCreateForm>();

  const onSubmit = (v: SprintCreateForm) => createSprint({ variables: { input: v } });

  return (
    <Layout title="New Sprint" backPath="/home">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input required {...register("name")} />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea rows={10} {...register("description")} />
        </FormControl>

        <Button type="submit" isLoading={loading}>
          Post
        </Button>
      </Stack>
    </Layout>
  );
});

export default SprintsNew;
