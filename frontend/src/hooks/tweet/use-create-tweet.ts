import { gql, useMutation } from "@apollo/client";

import { CreateTweetDocument, TweetConnection } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation createTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      id
      ...TweetItem
    }
  }
`;

export const useCreateTweet = () => {
  const toast = useAppToast();
  const { me } = useMe();

  const [createTweet, { loading }] = useMutation(CreateTweetDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          tweets: (existing: TweetConnection, { toReference }) => {
            if (!data) return existing;

            const edge = {
              cursor: new Date().toISOString(),
              node: toReference(data.createTweet),
            };
            const edges = [edge, ...existing.edges];

            return { ...existing, edges };
          },
        },
      });
    },
    onCompleted: () => toast.success("Created."),
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return { createTweet, loading };
};
