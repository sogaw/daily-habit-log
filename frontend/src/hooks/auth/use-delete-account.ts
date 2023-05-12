import { gql, useMutation } from "@apollo/client";
import { getAuth, signOut } from "firebase/auth";

import { DeleteAccountDocument } from "@/generated/gql/graphql";

import { useAppToast } from "../use-app-toast";

gql`
  mutation deleteAccount {
    deleteAccount
  }
`;

export const useDeleteAccount = () => {
  const toast = useAppToast();

  const [deleteAccount, { loading }] = useMutation(DeleteAccountDocument, {
    onCompleted: async () => {
      await signOut(getAuth());
      location.href = "/";
    },
    onError: (e) => {
      console.error(e);
      toast.error();
    },
  });

  return { deleteAccount, loading };
};
