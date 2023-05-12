import { gql, useQuery } from "@apollo/client";

import { SprintsDocument, SprintsFilter } from "@/generated/gql/graphql";
import { assertIsDefined } from "@/lib/assert-is-defined";

gql`
  query sprints($first: Int, $after: String, $filter: SprintsFilter) {
    viewer {
      id
      sprints(first: $first, after: $after, filter: $filter) {
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

export const useSprints = ({ skip, filter }: { skip: boolean; filter: SprintsFilter }) => {
  const { data, loading, error, fetchMore } = useQuery(SprintsDocument, { skip, variables: { filter } });

  const sprints = data?.viewer?.sprints.edges.map((edge) => edge.node);
  const pageInfo = data?.viewer?.sprints.pageInfo;

  const onFetchMore = () => {
    fetchMore({
      variables: { after: pageInfo?.endCursor, filter },
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

  return { sprints, pageInfo, loading, error, fetchMore: onFetchMore };
};
