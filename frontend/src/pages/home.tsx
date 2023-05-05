import { Box, VStack } from "@chakra-ui/react";

import { AppAvatar } from "@/components/AppAvatar";
import { Layout } from "@/components/Layout";
import { Guard } from "@/hocs/guard";
import { useMe } from "@/providers/auth";

const Home = Guard("WithOnboard", () => {
  const { me } = useMe();

  return (
    <Layout>
      <VStack py="4">
        <AppAvatar src={me.iconUrl || undefined} />
        <Box>{me.id}</Box>
        <Box>{me.name}</Box>
      </VStack>
    </Layout>
  );
});

export default Home;
