import { gql } from "@apollo/client";
import { Box, Button, Divider, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FragmentType, useFragment } from "@/generated/gql";
import {
  HabitItemFragment,
  HabitItemFragmentDoc,
  HabitRecordItemFragmentDoc,
  HabitRecordStatus,
} from "@/generated/gql/graphql";
import { useDeleteHabit } from "@/hooks/habit/use-delete-habit";
import { useUpdateHabitRecord } from "@/hooks/habit/use-update-habit-record";

gql`
  fragment HabitItem on Habit {
    id
    name
    description
    tooHard
    habitRecords {
      id
      ...HabitRecordItem
    }
  }
`;

export const HabitsList = (props: { habits: FragmentType<typeof HabitItemFragmentDoc>[]; mode: "view" | "edit" }) => {
  const habits = useFragment(HabitItemFragmentDoc, props.habits);

  return (
    <Stack spacing="4">
      {habits.map((habit, idx) => (
        <Stack key={habit.id} spacing="4">
          <HabitItem habit={habit} mode="edit" />
          {idx != habits.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}
    </Stack>
  );
};

/**
 * HabitItem
 */

const HabitItem = ({ habit, mode }: { habit: HabitItemFragment; mode: "edit" | "view" }) => {
  const navigate = useNavigate();

  const { deleteHabit, loading } = useDeleteHabit();

  const onDeleteHabit = async () => {
    if (confirm("Are you sure?")) await deleteHabit({ variables: { id: habit.id } });
  };

  return (
    <Stack>
      <Box>
        <Flex justify="space-between" align="center">
          <Box fontWeight="semibold" opacity={habit.tooHard ? "0.6" : "1"}>
            {habit.name}
          </Box>

          {mode == "edit" && (
            <HStack>
              {!habit.tooHard && (
                <Button size="xs" onClick={() => navigate(`/habits/${habit.id}/edit`)}>
                  <Icon as={FaPen} />
                </Button>
              )}

              <Button size="xs" onClick={onDeleteHabit} isDisabled={loading}>
                <Icon as={FaTrash} />
              </Button>
            </HStack>
          )}
        </Flex>

        <Box whiteSpace="pre-wrap" opacity={habit.tooHard ? "0.6" : "1"}>
          {habit.description}
        </Box>
      </Box>

      <Flex flexWrap="wrap" gap="8px 8px">
        {habit.habitRecords.map((habitRecord) => (
          <HabitRecordItem key={habitRecord.id} habitRecord={habitRecord} tooHard={habit.tooHard} />
        ))}
      </Flex>
    </Stack>
  );
};

/**
 * HabitRecordItem
 */

gql`
  fragment HabitRecordItem on HabitRecord {
    id
    date
    status
    habitId
  }
`;

const nextStatus = { SUCCESS: "FAILED", FAILED: "PENDING", PENDING: "SUCCESS" } as Record<
  HabitRecordStatus,
  HabitRecordStatus
>;
const statusColor = { SUCCESS: "green", FAILED: "red", PENDING: "gray" } as const;

const HabitRecordItem = (props: { habitRecord: FragmentType<typeof HabitRecordItemFragmentDoc>; tooHard: boolean }) => {
  const habitRecord = useFragment(HabitRecordItemFragmentDoc, props.habitRecord);

  const { updateHabitRecord, loading } = useUpdateHabitRecord();

  const onUpdateHabitRecord = () =>
    updateHabitRecord({
      variables: {
        input: {
          habitId: habitRecord.habitId,
          date: habitRecord.date,
          status: nextStatus[habitRecord.status],
        },
      },
    });

  return (
    <Box key={habitRecord.id}>
      <Button
        w="12"
        h="12"
        rounded="full"
        fontSize="xs"
        colorScheme={statusColor[habitRecord.status]}
        onClick={onUpdateHabitRecord}
        isDisabled={props.tooHard || loading}
      >
        {habitRecord.date.split("-").slice(1).join("/")}
      </Button>
    </Box>
  );
};
