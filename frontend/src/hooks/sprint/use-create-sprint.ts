import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CreateSprintDocument, SprintConnection } from "@/generated/gql/graphql";
import { useMe } from "@/providers/me";

import { useAppToast } from "../use-app-toast";

gql`
  mutation createSprint($input: CreateSprintInput!) {
    createSprint(input: $input) {
      id
      ...SprintItem
    }
  }
`;

export const useCreateSprint = () => {
  const navigate = useNavigate();
  const toast = useAppToast();
  const { me } = useMe();

  const [createSprint, { loading }] = useMutation(CreateSprintDocument, {
    update: (cache, { data }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          id: me.id,
        }),
        fields: {
          sprints: (existing: SprintConnection, { toReference }) => {
            if (!data) return existing;

            const edge = {
              cursor: new Date().toISOString(),
              node: toReference(data.createSprint),
            };
            const edges = [edge, ...existing.edges];

            return { ...existing, edges };
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

  return { createSprint, loading };
};
