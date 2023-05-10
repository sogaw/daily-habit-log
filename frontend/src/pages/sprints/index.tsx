import { gql, useQuery } from "@apollo/client";
import { Button, Center, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Fallback } from "@/components/Fallback";
import { Layout } from "@/components/Layout";
import { SprintsList } from "@/components/SprintsList";
import { SprintsDocument } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { assertIsDefined } from "@/lib/assert-is-defined";

gql`
  query sprints($first: Int, $after: String) {
    viewer {
      id
      sprints(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            ...SprintItem
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const SprintsIndex = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const { data, loading, error, fetchMore } = useQuery(SprintsDocument);
  const sprints = data?.viewer?.sprints.edges.map((edge) => edge.node);
  const pageInfo = data?.viewer?.sprints.pageInfo;

  const onFetchMore = (endCursor: string | null | undefined) => {
    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        assertIsDefined(prev.viewer);
        assertIsDefined(fetchMoreResult.viewer);
        return {
          viewer: {
            ...prev.viewer,
            sprints: {
              ...fetchMoreResult.viewer?.sprints,
              edges: [...prev.viewer.sprints.edges, ...fetchMoreResult.viewer.sprints.edges],
            },
          },
        };
      },
    });
  };

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
            <Stack>
              <SprintsList sprints={sprints} mode="edit" />
              {pageInfo?.hasNextPage && pageInfo.endCursor && (
                <Button
                  alignSelf="center"
                  variant="ghost"
                  onClick={() => onFetchMore(pageInfo.endCursor)}
                  isDisabled={loading}
                >
                  more
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Fallback>
    </Layout>
  );
});

export default SprintsIndex;
