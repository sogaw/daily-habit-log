import { gql } from "@apollo/client";
import { Box, Button, Divider, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FragmentType, useFragment } from "@/generated/gql";
import { SprintItemFragment, SprintItemFragmentDoc, SprintStatus } from "@/generated/gql/graphql";
import { useDeleteSprint } from "@/hooks/sprint/use-delete-sprint";
import { useUpdateSprintStatus } from "@/hooks/sprint/use-update-sprint-status";

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

export const SprintsList = (props: {
  sprints: FragmentType<typeof SprintItemFragmentDoc>[];
  mode: "view" | "edit";
}) => {
  const sprints = useFragment(SprintItemFragmentDoc, props.sprints);

  return (
    <Stack spacing="4">
      {sprints.map((sprint, idx) => (
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

const SprintItem = ({ sprint, mode }: { sprint: SprintItemFragment; mode: "edit" }) => {
  const navigate = useNavigate();

  const { deleteSprint, loading } = useDeleteSprint();

  const onDeleteSprint = async () => {
    if (confirm("Are you sure?")) await deleteSprint({ variables: { id: sprint.id } });
  };

  return (
    <Stack>
      <Box>
        <Flex justify="space-between" align="center">
          <Box fontWeight="semibold" opacity={sprint.active ? "1" : "0.6"}>
            {sprint.name}
          </Box>

          {mode == "edit" && (
            <HStack>
              {sprint.active && (
                <Button size="xs" onClick={() => navigate(`/sprints/${sprint.id}/edit`)}>
                  <Icon as={FaPen} />
                </Button>
              )}

              <Button size="xs" onClick={onDeleteSprint} isDisabled={loading}>
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
        {sprint.createdAt.split(" ").slice(0, 1).join("/")}
      </Button>
    </Box>
  );
};