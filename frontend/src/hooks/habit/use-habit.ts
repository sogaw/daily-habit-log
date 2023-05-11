import { gql, useQuery } from "@apollo/client";

import { HabitDocument } from "@/generated/gql/graphql";

gql`
  query habit($id: ID!) {
    viewer {
      id
      habit(id: $id) {
        id
        name
        description
      }
    }
  }
`;

export const useHabit = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(HabitDocument, { variables: { id } });
  const habit = data?.viewer?.habit;

  return {
    habit,
    loading,
    error,
  };
};
