import { Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Layout } from "@/components/Layout";
import { Guard } from "@/hocs/guard";
import { useCreateHabit } from "@/hooks/habit/use-create-habit";

type HabitCreateForm = {
  name: string;
  description: string;
};

const HabitsNew = Guard("AfterOnboard", () => {
  const { createHabit } = useCreateHabit();

  const { register, handleSubmit } = useForm<HabitCreateForm>();

  const onSubmit = (v: HabitCreateForm) => createHabit({ variables: { input: v } });

  return (
    <Layout title="New Habit" backPath="/home">
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
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
