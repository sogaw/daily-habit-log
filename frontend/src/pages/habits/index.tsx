import { gql, useQuery } from "@apollo/client";
import { Button, Center, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { HabitsList } from "@/components/HabitsList";
import { Layout } from "@/components/Layout";
import { HabitsDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";

gql`
  query habits {
    viewer {
      id
      habits {
        id
        ...HabitItem
      }
    }
  }
`;

const HabitsIndex = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(HabitsDocument);
  const habits = data?.viewer?.habits;

  return (
    <Layout title="Habits" backPath="/home">
      <Fallback loading={loading} error={error}>
        {habits && habits.length == 0 && (
          <Center py="2">
            <Button size="sm" colorScheme="green" onClick={() => navigate("/habits/new")}>
              Add new habit
            </Button>
          </Center>
        )}

        {habits && habits.length > 0 && (
          <Stack spacing="4" pb="6">
            <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/habits/new")}>
              New
            </Button>
            <HabitsList habits={habits} mode="edit" />
          </Stack>
        )}
      </Fallback>
    </Layout>
  );
});

export default HabitsIndex;
