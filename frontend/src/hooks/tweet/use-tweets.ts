import { gql, useQuery } from "@apollo/client";

import { TweetsDocument } from "@/generated/gql/graphql";
import { assertIsDefined } from "@/lib/assert-is-defined";

gql`
  query tweets($first: Int, $after: String) {
    viewer {
      id
      tweets(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            ...TweetItem
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

export const useTweets = ({ skip }: { skip: boolean }) => {
  const { data, loading, error, fetchMore } = useQuery(TweetsDocument, { skip });

  const tweets = data?.viewer?.tweets.edges.map((edge) => edge.node);
  const pageInfo = data?.viewer?.tweets.pageInfo;

  const onFetchMore = () => {
    fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        assertIsDefined(prev.viewer);
        assertIsDefined(fetchMoreResult.viewer);
        return {
          viewer: {
            ...prev.viewer,
            tweets: {
              ...fetchMoreResult.viewer?.tweets,
              edges: [...prev.viewer.tweets.edges, ...fetchMoreResult.viewer.tweets.edges],
            },
          },
        };
      },
    });
  };

  return { tweets, pageInfo, loading, error, fetchMore: onFetchMore };
};
