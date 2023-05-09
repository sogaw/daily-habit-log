import { gql, Reference, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { CreateSprintDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useMe } from "@/providers/auth";

gql`
  mutation createSprint($input: CreateSprintInput!) {
    createSprint(input: $input) {
      id
      ...SprintItem
    }
  }
`;

type SprintCreateForm = {
  name: string;
  description: string;
};

const SprintsNew = Guard("AfterOnboard", () => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const { register, handleSubmit } = useForm<SprintCreateForm>();

  const [createSprint] = useMutation(CreateSprintDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          sprints: (existing: Reference[] = [], { toReference }) => {
            if (!data) return existing;
            return [toReference(data.createSprint), ...existing];
          },
          activeSprints: (existing: Reference[] = [], { toReference }) => {
            if (!data) return existing;
            return [toReference(data.createSprint), ...existing];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Created.");
      navigate("/sprints");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return (
    <Layout title="New Sprint" backPath="/sprints">
      <Stack as="form" onSubmit={handleSubmit((v) => createSprint({ variables: { input: v } }))}>
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
    </Layout>
  );
});

export default SprintsNew;
