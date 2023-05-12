import { gql, useMutation } from "@apollo/client";

import { DeleteTweetDocument, TweetConnection, TweetEdge } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
    }
  }
`;

export const useDeleteTweet = () => {
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteTweet, { loading }] = useMutation(DeleteTweetDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          tweets: (existing: TweetConnection, { readField }) => {
            const edges = existing.edges.filter(
              (edge: TweetEdge) => readField("id", edge.node) != data?.deleteTweet.id
            );
            return { ...existing, edges };
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Deleted.");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return { deleteTweet, loading };
};
