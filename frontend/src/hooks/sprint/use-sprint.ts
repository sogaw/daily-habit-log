import { gql, useQuery } from "@apollo/client";

import { SprintDocument } from "@/generated/gql/graphql";

gql`
  query sprint($id: ID!) {
    viewer {
      id
      sprint(id: $id) {
        id
        name
        description
      }
    }
  }
`;

export const useSprint = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(SprintDocument, { variables: { id } });
  const sprint = data?.viewer?.sprint;

  return { sprint, loading, error };
};
