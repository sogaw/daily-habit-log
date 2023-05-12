import { gql } from "@apollo/client";
import { Box, Button, Divider, Flex, Icon, Stack } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import { FragmentType, useFragment } from "@/generated/gql";
import { TweetItemFragment, TweetItemFragmentDoc } from "@/generated/gql/graphql";
import { useDeleteTweet } from "@/hooks/tweet/use-delete-tweet";

export const TweetsList = (props: { tweets: FragmentType<typeof TweetItemFragmentDoc>[] }) => {
  const tweets = useFragment(TweetItemFragmentDoc, props.tweets);

  return (
    <Stack spacing="4">
      {tweets.map((tweet, idx) => (
        <Stack key={tweet.id} spacing="4">
          <TweetItem tweet={tweet} />
          {idx != tweets.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * TweetItem
 */

gql`
  fragment TweetItem on Tweet {
    id
    content
    createdAt
    formattedCreatedAt
  }
`;

const TweetItem = ({ tweet }: { tweet: TweetItemFragment }) => {
  const { deleteTweet, loading } = useDeleteTweet();

  const onDeleteTweet = async () => {
    if (confirm("Are you sure?")) await deleteTweet({ variables: { id: tweet.id } });
  };

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Box fontSize="sm">{tweet.formattedCreatedAt}</Box>

        <Button size="xs" variant="ghost" onClick={onDeleteTweet} isDisabled={loading}>
          <Icon as={FaTrash} color="gray.500" />
        </Button>
      </Flex>
      <Box whiteSpace="pre-wrap">{tweet.content}</Box>
    </Stack>
  );
};
