import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { UpdateSprintDocument } from "@/generated/gql/graphql";

import { useAppToast } from "../use-app-toast";

gql`
  mutation updateSprint($id: ID!, $input: UpdateSprintInput!) {
    updateSprint(id: $id, input: $input) {
      id
      name
      description
    }
  }
`;

export const useUpdateSprint = () => {
  const navigate = useNavigate();
  const toast = useAppToast();

  const [updateSprint, { loading }] = useMutation(UpdateSprintDocument, {
    onCompleted: () => {
      toast.success("Updated.");
      navigate("/home");
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return { updateSprint, loading };
};
