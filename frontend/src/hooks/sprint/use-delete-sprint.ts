import { gql, Reference, useMutation } from "@apollo/client";

import { DeleteSprintDocument, SprintConnection, SprintEdge } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation deleteSprint($id: ID!) {
    deleteSprint(id: $id) {
      id
    }
  }
`;

export const useDeleteSprint = () => {
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteSprint, { loading }] = useMutation(DeleteSprintDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          sprints: (existing: SprintConnection, { readField }) => {
            const edges = existing.edges.filter(
              (edge: SprintEdge) => readField("id", edge.node) != data?.deleteSprint.id
            );
            return { ...existing, edges };
          },
          activeSprints: (existing: Reference[] = [], { readField }) => {
            return existing.filter((habitRef) => readField("id", habitRef) != data?.deleteSprint.id);
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

  return { deleteSprint, loading };
};
