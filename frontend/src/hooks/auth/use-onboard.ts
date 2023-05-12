import { gql, useMutation } from "@apollo/client";

import { MeDocument, OnboardDocument } from "@/generated/gql/graphql";

gql`
  mutation onboard($input: OnboardInput!) {
    onboard(input: $input) {
      id
    }
  }
`;

export const useOnboard = () => {
  const [onboard] = useMutation(OnboardDocument, {
    refetchQueries: [{ query: MeDocument }],
  });

  return { onboard };
};
