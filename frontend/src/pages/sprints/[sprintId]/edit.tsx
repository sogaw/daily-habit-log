import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { Layout } from "@/components/Layout";
import { Sprint, SprintDocument, UpdateSprintDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";

gql`
  query sprint($id: ID!) {
    viewer {
      id
      sprint(id: $id) {
        id
        name
        description
      }
    }
  }
`;

gql`
  mutation updateSprint($id: ID!, $input: UpdateSprintInput!) {
    updateSprint(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

const SprintEditContainer = Guard("AfterOnboard", () => {
  const { sprintId } = useParams();

  const { data, loading, error } = useQuery(SprintDocument, { variables: { id: sprintId as string } });
  const sprint = data?.viewer?.sprint;

  return (
    <Layout title="Edit Sprint" backPath="/sprints">
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
  const navigate = useNavigate();
  const toast = useAppToast();

  const { register, handleSubmit } = useForm<SprintUpdateForm>({
    defaultValues: { name: sprint.name, description: sprint.description },
  });

  const [createSprint] = useMutation(UpdateSprintDocument, {
    onCompleted: () => {
      toast.success("Updated.");
      navigate("/sprints");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return (
    <Stack as="form" onSubmit={handleSubmit((v) => createSprint({ variables: { id: sprint.id, input: v } }))}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input required {...register("name")} />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea rows={10} {...register("description")} />
      </FormControl>

      <Button type="submit">Post</Button>
    </Stack>
  );
};
