import { gql, useMutation } from "@apollo/client";

import { UpdateHabitRecordDocument } from "@/generated/gql/graphql";

import { useAppToast } from "../use-app-toast";

gql`
  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {
    updateHabitRecord(input: $input) {
      id
      ...HabitRecordItem
      habit {
        id
        tooHard
      }
    }
  }
`;

export const useUpdateHabitRecord = () => {
  const toast = useAppToast();

  const [updateHabitRecord, { loading }] = useMutation(UpdateHabitRecordDocument, {
    onCompleted: () => {
      toast.success("Updated.");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return {
    updateHabitRecord,
    loading,
  };
};
