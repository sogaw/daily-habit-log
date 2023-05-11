import { gql, Reference, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CreateHabitDocument } from "@/generated/gql/graphql";
import { useMe } from "@/providers/auth";

import { useAppToast } from "../use-app-toast";

gql`
  mutation createHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
      id
      ...HabitItem
    }
  }
`;

export const useCreateHabit = () => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const [createHabit, { loading }] = useMutation(CreateHabitDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          habits: (existing: Reference[] = [], { toReference }) => {
            if (!data) return existing;
            return [toReference(data.createHabit), ...existing];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success("Created.");
      navigate("/home");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return {
    createHabit,
    loading,
  };
};
