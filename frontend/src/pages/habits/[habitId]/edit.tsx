import { gql } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { Layout } from "@/components/Layout";
import { Habit } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useHabit } from "@/hooks/habit/use-habit";
import { useUpdateHabit } from "@/hooks/habit/use-update-habit";

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

const HabitEditContainer = Guard("AfterOnboard", () => {
  const { habitId } = useParams();
  const { habit, loading, error } = useHabit({ id: habitId as string });

  return (
    <Layout title="Edit Habit" backPath="/home">
      <Fallback loading={loading} error={error}>
        {habit ? <HabitEdit habit={habit} /> : <Navigate to="/not-found" />}
      </Fallback>
    </Layout>
  );
});

export default HabitEditContainer;

type HabitUpdateForm = {
  name: string;
  description: string;
};

const HabitEdit = ({ habit }: { habit: Pick<Habit, "id" | "name" | "description"> }) => {
  const { updateHabit, loading } = useUpdateHabit();

  const { register, handleSubmit } = useForm<HabitUpdateForm>({
    defaultValues: { name: habit.name, description: habit.description },
  });

  const onSubmit = (v: HabitUpdateForm) => updateHabit({ variables: { id: habit.id, input: v } });

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
