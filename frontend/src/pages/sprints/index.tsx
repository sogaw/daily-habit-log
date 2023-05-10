import { gql, useQuery } from "@apollo/client";
import { Button, Center, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { Layout } from "@/components/Layout";
import { SprintsList } from "@/components/SprintsList";
import { SprintsDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";

gql`
  query sprints {
    viewer {
      id
      sprints {
        id
        ...SprintItem
      }
    }
  }
`;

const SprintsIndex = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(SprintsDocument);
  const sprints = data?.viewer?.sprints;

  return (
    <Layout title="Sprints" backPath="/home">
      <Fallback loading={loading} error={error}>
        {sprints && sprints.length == 0 && (
          <Center py="2">
            <Button size="sm" colorScheme="green" onClick={() => navigate("/sprints/new")}>
              Add new sprint
            </Button>
          </Center>
        )}

        {sprints && sprints.length > 0 && (
          <Stack spacing="4" pb="6">
            <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/sprints/new")}>
              New
            </Button>
            <SprintsList sprints={sprints} mode="edit" />
          </Stack>
        )}
      </Fallback>
    </Layout>
  );
});

export default SprintsIndex;
