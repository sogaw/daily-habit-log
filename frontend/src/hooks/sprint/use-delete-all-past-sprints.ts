import { gql, useMutation } from "@apollo/client";

import { DeleteAllPastSprintsDocument, SprintConnection, SprintEdge } from "@/generated/gql/graphql";
import { isToday } from "@/lib/date";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation deleteAllPastSprints {
    deleteAllPastSprints {
      id
    }
  }
`;

export const useDeleteAllPastSprints = () => {
  const toast = useAppToast();
  const { me } = useMe();

  const [deleteAllPastSprints, { loading }] = useMutation(DeleteAllPastSprintsDocument, {
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          sprints: (existing: SprintConnection, { readField }) => {
            const edges = existing.edges.filter((edge: SprintEdge) => {
              const createdAt = readField("createdAt", edge.node);
              if (typeof createdAt == "string") return isToday(createdAt);
              console.warn("sprint.createdAt is not included");
              return true;
            });
            return { ...existing, edges };
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

  return { deleteAllPastSprints, loading };
};
