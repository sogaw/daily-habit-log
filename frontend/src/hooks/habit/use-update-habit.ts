import { gql, Reference, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { UpdateHabitDocument } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation updateHabit($id: ID!, $input: UpdateHabitInput!) {
    updateHabit(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

export const useUpdateHabit = () => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const [updateHabit, { loading }] = useMutation(UpdateHabitDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          habits: (existing: Reference[] = [], { toReference, readField }) => {
            if (!data) return existing;
            return [
              toReference(data.updateHabit),
              ...existing.filter((habitRef) => readField("id", habitRef) != data.updateHabit.id),
            ];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Updated.");
      navigate("/home");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return {
    updateHabit,
    loading,
  };
};
