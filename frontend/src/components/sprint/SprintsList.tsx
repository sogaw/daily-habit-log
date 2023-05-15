import { gql } from "@apollo/client";
import { Box, Button, Divider, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FragmentType, useFragment } from "@/generated/gql";
import { SprintItemFragment, SprintItemFragmentDoc, SprintStatus } from "@/generated/gql/graphql";
import { useDeleteAllPastSprints } from "@/hooks/sprint/use-delete-all-past-sprints";
import { useDeleteSprint } from "@/hooks/sprint/use-delete-sprint";
import { useUpdateSprintStatus } from "@/hooks/sprint/use-update-sprint-status";
import { isToday } from "@/lib/date";

export const SprintsList = (props: {
  sprints: FragmentType<typeof SprintItemFragmentDoc>[];
  mode: "view" | "edit";
}) => {
  const sprints = useFragment(SprintItemFragmentDoc, props.sprints);

  const todaySprints = sprints.filter((sprint) => isToday(sprint.createdAt));
  const pastSprints = sprints.filter((sprint) => !isToday(sprint.createdAt));

  const { deleteAllPastSprints, loading } = useDeleteAllPastSprints();

  const onDeleteALlPastSprints = async () => {
    if (confirm("Are you sure?")) await deleteAllPastSprints();
  };

  return (
    <Stack spacing="4">
      {todaySprints.map((sprint, idx) => (
        <Stack key={sprint.id} spacing="4">
          <SprintItem sprint={sprint} mode="edit" />
          {idx != sprints.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}

      {pastSprints.length > 0 && (
        <Stack spacing="4">
          <Button alignSelf="center" variant="ghost" size="sm" onClick={onDeleteALlPastSprints} isDisabled={loading}>
            Delete all past
          </Button>
          <Divider />
        </Stack>
      )}

      {pastSprints.map((sprint, idx) => (
        <Stack key={sprint.id} spacing="4">
          <SprintItem sprint={sprint} mode="edit" />
          {idx != sprints.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * SprintItem
 */

gql`
  fragment SprintItem on Sprint {
    id
    name
    status
    description
    active
    createdAt
    createdOn
  }
`;

const SprintItem = ({ sprint, mode }: { sprint: SprintItemFragment; mode: "edit" }) => {
  const navigate = useNavigate();

  const { deleteSprint, loading } = useDeleteSprint();

  const onDeleteSprint = async () => {
    if (confirm("Are you sure?")) await deleteSprint({ variables: { id: sprint.id } });
  };

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Box fontWeight="semibold" opacity={sprint.active ? "1" : "0.6"}>
          {sprint.name}
        </Box>

        {mode == "edit" && (
          <HStack spacing="1">
            {sprint.active && (
              <Button size="xs" variant="ghost" onClick={() => navigate(`/sprints/${sprint.id}/edit`)}>
                <Icon as={FaPen} color="gray.500" />
              </Button>
            )}

            <Button size="xs" variant="ghost" onClick={onDeleteSprint} isDisabled={loading}>
              <Icon as={FaTrash} color="gray.500" />
            </Button>
          </HStack>
        )}
      </Flex>

      {sprint.description && (
        <Box whiteSpace="pre-wrap" opacity={sprint.active ? "1" : "0.6"}>
          {sprint.description}
        </Box>
      )}

      <SprintStatusItem sprint={sprint} />
    </Stack>
  );
};

/**
 * SprintStatusItem
 */

const nextStatus = { SUCCESS: "FAILED", FAILED: "PENDING", PENDING: "SUCCESS" } as Record<SprintStatus, SprintStatus>;
const statusColor = { SUCCESS: "green", FAILED: "red", PENDING: "gray" } as const;

const SprintStatusItem = ({ sprint }: { sprint: SprintItemFragment }) => {
  const { updateSprintStatus, loading } = useUpdateSprintStatus();

  const onUpdateSprintStatus = () =>
    updateSprintStatus({
      variables: {
        id: sprint.id,
        input: { status: nextStatus[sprint.status] },
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
        onClick={onUpdateSprintStatus}
        isDisabled={!sprint.active || loading}
      >
        {sprint.createdOn.split("-").slice(1).join("/")}
      </Button>
    </Box>
  );
};
