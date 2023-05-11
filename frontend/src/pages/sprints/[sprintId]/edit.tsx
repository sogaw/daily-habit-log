import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { Layout } from "@/components/Layout";
import { Sprint } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useSprint } from "@/hooks/sprint/use-sprint";
import { useUpdateSprint } from "@/hooks/sprint/use-update-sprint";

const SprintEditContainer = Guard("AfterOnboard", () => {
  const { sprintId } = useParams();

  const { sprint, loading, error } = useSprint({ id: sprintId as string });

  return (
    <Layout title="Edit Sprint" backPath="/home">
      <Fallback loading={loading} error={error}>
        {sprint ? <SprintEdit sprint={sprint} /> : <Navigate to="/not-found" />}
      </Fallback>
    </Layout>
  );
});

export default SprintEditContainer;

type SprintUpdateForm = {
  name: string;
  description: string;
};

const SprintEdit = ({ sprint }: { sprint: Pick<Sprint, "id" | "name" | "description"> }) => {
  const { updateSprint, loading } = useUpdateSprint();

  const { register, handleSubmit } = useForm<SprintUpdateForm>({
    defaultValues: { name: sprint.name, description: sprint.description },
  });

  const onSubmit = (v: SprintUpdateForm) => updateSprint({ variables: { id: sprint.id, input: v } });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input required {...register("name")} />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea rows={10} {...register("description")} />
      </FormControl>

      <Button type="submit" isDisabled={loading}>
        Post
      </Button>
    </Stack>
  );
};
