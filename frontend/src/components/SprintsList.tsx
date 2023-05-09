import { gql, Reference, useMutation } from "@apollo/client";
import { Box, Button, Divider, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FragmentType, useFragment } from "@/generated/gql";
import {
  DeleteSprintDocument,
  SprintItemFragment,
  SprintItemFragmentDoc,
  SprintStatus,
  UpdateSprintStatusDocument,
} from "@/generated/gql/graphql";
import { useAppToast } from "@/hooks/use-app-toast";
import { useMe } from "@/providers/auth";

gql`
  fragment SprintItem on Sprint {
    id
    name
    status
    description
    active
    createdAt
  }
`;

gql`
  mutation deleteSprint($id: ID!) {
    deleteSprint(id: $id) {
      id
    }
  }
`;

export const SprintsList = (props: {
  sprints: FragmentType<typeof SprintItemFragmentDoc>[];
  mode: "view" | "edit";
}) => {
  const sprints = useFragment(SprintItemFragmentDoc, props.sprints);

  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteSprint] = useMutation(DeleteSprintDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          sprints: (existing: Reference[] = [], { readField }) => {
            return existing.filter((habitRef) => readField("id", habitRef) != data?.deleteSprint.id);
          },
          activeSprints: (existing: Reference[] = [], { readField }) => {
            return existing.filter((habitRef) => readField("id", habitRef) != data?.deleteSprint.id);
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

  const onDeleteSprint = async (id: string) => {
    if (confirm("Are you sure?")) await deleteSprint({ variables: { id } });
  };

  return (
    <Stack spacing="4">
      {sprints.map((sprint, idx) => (
        <Stack key={sprint.id} spacing="4">
          <Stack>
            <Box>
              <Flex justify="space-between" align="center">
                <Box fontWeight="semibold" opacity={sprint.active ? "1" : "0.6"}>
                  {sprint.name}
                </Box>

                {props.mode == "edit" && (
                  <HStack>
                    {sprint.active && (
                      <Button size="xs" onClick={() => navigate(`/sprints/${sprint.id}/edit`)}>
                        <Icon as={FaPen} />
                      </Button>
                    )}

                    <Button size="xs" onClick={() => onDeleteSprint(sprint.id)}>
                      <Icon as={FaTrash} />
                    </Button>
                  </HStack>
                )}
              </Flex>

              <Box whiteSpace="pre-wrap" opacity={sprint.active ? "1" : "0.6"}>
                {sprint.description}
              </Box>
            </Box>

            <SprintStatusItem sprint={sprint} />
          </Stack>

          {idx != sprints.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * SprintStatusItem
 */

gql`
  mutation updateSprintStatus($id: ID!, $input: UpdateSprintStatusInput!) {
    updateSprintStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

const nextStatus = { SUCCESS: "FAILED", FAILED: "PENDING", PENDING: "SUCCESS" } as Record<SprintStatus, SprintStatus>;
const statusColor = { SUCCESS: "green", FAILED: "red", PENDING: "gray" } as const;

const SprintStatusItem = ({ sprint }: { sprint: SprintItemFragment }) => {
  const toast = useAppToast();

  const [updateSprintStatus, { loading }] = useMutation(UpdateSprintStatusDocument, {
    onCompleted: () => {
      toast.success("Updated.");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return (
    <Box>
      <Button
        w="12"
        h="12"
        rounded="full"
        fontSize="xs"
        colorScheme={statusColor[sprint.status]}
        onClick={() =>
          updateSprintStatus({
            variables: {
              id: sprint.id,
              input: { status: nextStatus[sprint.status] },
            },
          })
        }
        isDisabled={!sprint.active || loading}
      >
        {sprint.createdAt.split(" ").slice(0, 1).join("/")}
      </Button>
    </Box>
  );
};
