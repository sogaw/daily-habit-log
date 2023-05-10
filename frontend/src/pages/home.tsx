import { gql, useQuery } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { HabitsList } from "@/components/HabitsList";
import { Layout } from "@/components/Layout";
import { SprintsList } from "@/components/SprintsList";
import { HomeDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";

gql`
  query home {
    viewer {
      id
      habits {
        id
        ...HabitItem
      }
      activeSprints {
        id
        ...SprintItem
      }
    }
  }
`;

const Home = Guard("AfterOnboard", () => {
  const { data, loading, error } = useQuery(HomeDocument);

  const habits = data?.viewer?.habits;
  const sprints = data?.viewer?.activeSprints;

  return (
    <Layout>
      <Fallback loading={loading} error={error}>
        <Stack spacing="4" pb="6">
          <Stack spacing="4">
            <Link to="/habits">
              <Box fontWeight="bold" fontSize="xl">
                Habits
              </Box>
            </Link>
            {habits && habits.length == 0 && <Link to="/habits">to habits</Link>}
            {habits && habits.length > 0 && <HabitsList habits={habits} mode="view" />}
          </Stack>

          <Stack spacing="4">
            <Link to="/sprints">
              <Box fontWeight="bold" fontSize="xl">
                Sprints
              </Box>
            </Link>
            {sprints && sprints.length == 0 && <Link to="/sprints">to sprints</Link>}
            {sprints && sprints.length > 0 && <SprintsList sprints={sprints} mode="view" />}
          </Stack>
        </Stack>
      </Fallback>
    </Layout>
  );
});

export default Home;
