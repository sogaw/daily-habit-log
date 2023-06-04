import { Box, Button, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { Fallback } from "@/components/Fallback";
import { HabitsList } from "@/components/habit/HabitsList";
import { Layout } from "@/components/Layout";
import { TweetCreateForm } from "@/components/tweet/TweetCreateForm";
import { TweetsList } from "@/components/tweet/TweetsList";
import { Guard } from "@/hocs/guard";
import { useHabits } from "@/hooks/habit/use-habits";
import { useTweets } from "@/hooks/tweet/use-tweets";

const Home = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useLocalStorage("daily-habit-log.home.tab", 0);

  const { habits, loading: habitsLoading, error: habitsError } = useHabits({ skip: tabIndex != 0 });

  const {
    tweets,
    pageInfo: tweetsPageInfo,
    loading: tweetsLoading,
    error: tweetsError,
    fetchMore: tweetsFetchMore,
  } = useTweets({ skip: tabIndex != 1 });

  return (
    <Layout pt="0">
      <Tabs position="relative" defaultIndex={tabIndex} onChange={setTabIndex}>
        <TabList position="sticky" top="14" zIndex="1" bg="white">
          <Tab fontWeight="semibold">Habits</Tab>
          <Tab fontWeight="semibold">Tweets</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="2">
            <Stack spacing="4">
              <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/habits/new")}>
                New habit
              </Button>

              <Fallback loading={habitsLoading} error={habitsError}>
                {habits?.length == 0 && (
                  <Box alignSelf="center" fontWeight="semibold" fontSize="sm" color="gray.500">
                    No Habits
                  </Box>
                )}
                {habits && <HabitsList habits={habits} mode="edit" />}
              </Fallback>
            </Stack>
          </TabPanel>

          <TabPanel px="2">
            <Stack spacing="4">
              <TweetCreateForm />
              <Fallback loading={tweetsLoading} error={tweetsError}>
                {tweets?.length == 0 && (
                  <Box alignSelf="center" fontWeight="semibold" fontSize="sm" color="gray.500">
                    No Tweets
                  </Box>
                )}
                {tweets && <TweetsList tweets={tweets} />}
                {tweetsPageInfo?.hasNextPage && (
                  <Button
                    alignSelf="center"
                    variant="ghost"
                    size="sm"
                    onClick={() => tweetsFetchMore()}
                    isDisabled={tweetsLoading}
                  >
                    More
                  </Button>
                )}
              </Fallback>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
});

export default Home;
