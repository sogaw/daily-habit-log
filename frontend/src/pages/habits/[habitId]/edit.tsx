import { Center } from "@chakra-ui/react";

import { Layout } from "@/components/Layout";
import { Guard } from "@/hocs/guard";

const HabitEditContainer = Guard("WithOnboard", () => {
  return (
    <Layout title="Edit Habit" backPath="/home">
      <Center>TODO</Center>
    </Layout>
  );
});

type HabitUpdateForm = {
  name: string;
  description: string;
};

export default HabitEditContainer;
