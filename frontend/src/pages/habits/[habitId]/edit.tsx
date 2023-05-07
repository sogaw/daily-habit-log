import { gql, Reference, useMutation, useQuery } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/PageLoading";
import { Habit, HabitDocument, UpdateHabitDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useMe } from "@/providers/auth";

gql`
  query habit($id: ID!) {
    viewer {
      id
      habit(id: $id) {
        id
        name
        description
      }
    }
  }
`;

gql`
  mutation updateHabit($id: ID!, $input: UpdateHabitInput!) {
    updateHabit(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

const HabitEditContainer = Guard("WithOnboard", () => {
  const { habitId } = useParams();

  const { data, loading } = useQuery(HabitDocument, { variables: { id: habitId as string } });
  const habit = data?.viewer?.habit;

  if (loading) return <PageLoading />;
  return habit ? <HabitEdit habit={habit} /> : <Navigate to="/not-found" />;
});

export default HabitEditContainer;

type HabitUpdateForm = {
  name: string;
  description: string;
};

const HabitEdit = ({ habit }: { habit: Pick<Habit, "id" | "name" | "description"> }) => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const { register, handleSubmit } = useForm<HabitUpdateForm>({
    defaultValues: { name: habit.name, description: habit.description },
  });

  const [createHabit] = useMutation(UpdateHabitDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          habits: (existing: Reference[] = [], { toReference, readField }) => {
            if (!data) return existing;
            return [
              toReference(data.updateHabit),
              ...existing.filter((habitRef) => readField("id", habitRef) != data.updateHabit.id),
            ];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Updated.");
      navigate("/home");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return (
    <Layout title="New Habit" backPath="/home">
      <Stack as="form" onSubmit={handleSubmit((v) => createHabit({ variables: { id: habit.id, input: v } }))}>
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
};
