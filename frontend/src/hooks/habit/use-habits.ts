import { gql, useQuery } from "@apollo/client";

import { HabitsDocument } from "@/generated/gql/graphql";

gql`
  query habits {
    viewer {
      id
      habits {
        id
        ...HabitItem
      }
    }
  }
`;

export const useHabits = ({ skip }: { skip: boolean }) => {
  const { data, loading, error } = useQuery(HabitsDocument, { skip });
  const habits = data?.viewer?.habits;

  return {
    habits,
    loading,
    error,
  };
};
