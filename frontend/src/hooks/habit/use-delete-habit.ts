import { gql, Reference, useMutation } from "@apollo/client";

import { DeleteHabitDocument } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation deleteHabit($id: ID!) {
    deleteHabit(id: $id) {
      id
    }
  }
`;

export const useDeleteHabit = () => {
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteHabit, { loading }] = useMutation(DeleteHabitDocument, {
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

  return {
    deleteHabit,
    loading,
  };
};
