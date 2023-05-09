import { gql, Reference, useMutation } from "@apollo/client";
import { Box, Button, Divider, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FragmentType, useFragment } from "@/generated/gql";
import {
  DeleteHabitDocument,
  HabitItemFragmentDoc,
  HabitRecordItemFragmentDoc,
  HabitRecordStatus,
  UpdateHabitRecordDocument,
} from "@/generated/gql/graphql";
import { useAppToast } from "@/hooks/use-app-toast";
import { useMe } from "@/providers/auth";

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

gql`
  mutation deleteHabit($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`;

export const HabitsList = (props: { habits: FragmentType<typeof HabitItemFragmentDoc>[]; mode: "view" | "edit" }) => {
  const habits = useFragment(HabitItemFragmentDoc, props.habits);

  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteHabit] = useMutation(DeleteHabitDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          habits: (existing: Reference[] = [], { readField }) => {
            return existing.filter((habitRef) => readField("id", habitRef) != data?.deleteHabit.id);
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

  const onDeleteHabit = async (id: string) => {
    if (confirm("Are you sure?")) await deleteHabit({ variables: { id } });
  };

  return (
    <Stack spacing="4">
      {habits.map((habit, idx) => (
        <Stack key={habit.id} spacing="4">
          <Stack>
            <Box>
              <Flex justify="space-between" align="center">
                <Box fontWeight="semibold" opacity={habit.tooHard ? "0.6" : "1"}>
                  {habit.name}
                </Box>

                {props.mode == "edit" && (
                  <HStack>
                    {!habit.tooHard && (
                      <Button size="xs" onClick={() => navigate(`/habits/${habit.id}/edit`)}>
                        <Icon as={FaPen} />
                      </Button>
                    )}

                    <Button size="xs" onClick={() => onDeleteHabit(habit.id)}>
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

          {idx != habits.length - 1 ? <Divider /> : <Box />}
        </Stack>
      ))}
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

gql`
  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {
    updateHabitRecord(input: $input) {
      id
      ...HabitRecordItem
    }
  }
`;

const nextStatus = { SUCCESS: "FAILED", FAILED: "PENDING", PENDING: "SUCCESS" } as Record<
  HabitRecordStatus,
  HabitRecordStatus
>;
const statusColor = { SUCCESS: "green", FAILED: "red", PENDING: "gray" } as const;

const HabitRecordItem = (props: { habitRecord: FragmentType<typeof HabitRecordItemFragmentDoc>; tooHard: boolean }) => {
  const habitRecord = useFragment(HabitRecordItemFragmentDoc, props.habitRecord);

  const toast = useAppToast();

  const [updateHabitRecord, { loading }] = useMutation(UpdateHabitRecordDocument, {
    variables: {
      input: {
        habitId: habitRecord.habitId,
        date: habitRecord.date,
        status: nextStatus[habitRecord.status],
      },
    },
    onCompleted: () => {
      toast.success("Updated.");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
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
        onClick={() => updateHabitRecord()}
        isDisabled={props.tooHard || loading}
      >
        {habitRecord.date.split("-").slice(1).join("/")}
      </Button>
    </Box>
  );
};
