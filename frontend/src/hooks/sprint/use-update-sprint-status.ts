import { gql, useMutation } from "@apollo/client";

import { UpdateSprintStatusDocument } from "@/generated/gql/graphql";

import { useAppToast } from "../use-app-toast";

gql`
  mutation updateSprintStatus($id: ID!, $input: UpdateSprintStatusInput!) {
    updateSprintStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

export const useUpdateSprintStatus = () => {
  const toast = useAppToast();

  const [updateSprintStatus, { loading }] = useMutation(UpdateSprintStatusDocument, {
    onCompleted: () => {
      toast.success("Updated.");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return { updateSprintStatus, loading };
};
