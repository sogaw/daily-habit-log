import { gql, Reference, useMutation } from "@apollo/client";
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { CreateHabitDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useAppToast } from "@/hooks/use-app-toast";
import { useMe } from "@/providers/auth";

gql`
  mutation createHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
      id
      name
      description
      tooHard
      habitRecords {
        id
        date
        status
        habitId
      }
    }
  }
`;

type HabitCreateForm = {
  name: string;
  description: string;
};

const HabitsNew = Guard("AfterOnboard", () => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const { register, handleSubmit } = useForm<HabitCreateForm>();

  const [createHabit] = useMutation(CreateHabitDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          habits: (existing: Reference[] = [], { toReference }) => {
            if (!data) return existing;
            return [toReference(data.createHabit), ...existing];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Created.");
      navigate("/home");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return (
    <Layout title="New Habit" backPath="/home">
      <Stack as="form" onSubmit={handleSubmit((v) => createHabit({ variables: { input: v } }))}>
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

export default HabitsNew;
