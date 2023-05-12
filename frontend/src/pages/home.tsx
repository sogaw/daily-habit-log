import { Box, Button, Flex, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { Fallback } from "@/components/Fallback";
import { HabitsList } from "@/components/habit/HabitsList";
import { Layout } from "@/components/Layout";
import { SprintsList } from "@/components/sprint/SprintsList";
import { SprintsFilter } from "@/generated/gql/graphql";
import { Guard } from "@/hocs/guard";
import { useHabits } from "@/hooks/habit/use-habits";
import { useSprints } from "@/hooks/sprint/use-sprints";

const Home = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useLocalStorage("daily-habit-log.home.tab", 0);
  const [sprintsFilter, setSprintsFilter] = useState<SprintsFilter>("TODAY");

  const { habits, loading: habitsLoading, error: habitsError } = useHabits({ skip: tabIndex != 0 });

  const {
    sprints,
    pageInfo: sprintsPageInfo,
    loading: sprintsLoading,
    error: sprintsError,
    fetchMore: sprintsFetchMore,
  } = useSprints({ skip: tabIndex != 1, filter: sprintsFilter });

  return (
    <Layout pt="0">
      <Tabs position="relative" defaultIndex={tabIndex} onChange={setTabIndex}>
        <TabList position="sticky" top="14" zIndex="1" bg="white">
          <Tab fontWeight="semibold">Habits</Tab>
          <Tab fontWeight="semibold">Sprints</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="2">
            <Stack spacing="4">
              <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/habits/new")}>
                New habit
              </Button>

              <Fallback loading={habitsLoading} error={habitsError}>
                {habits && <HabitsList habits={habits} mode="edit" />}
              </Fallback>
            </Stack>
          </TabPanel>

          <TabPanel px="2">
            <Stack spacing="4">
              <Flex justify="space-between" align="center">
                <Box w="32">
                  <Select
                    size="sm"
                    rounded="md"
                    value={sprintsFilter}
                    onChange={(e) => setSprintsFilter(e.target.value as SprintsFilter)}
                  >
                    <option value="TODAY">Today</option>
                    <option value="ALL">All</option>
                  </Select>
                </Box>

                <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/sprints/new")}>
                  New sprint
                </Button>
              </Flex>

              <Stack>
                <Fallback loading={sprintsLoading} error={sprintsError}>
                  {sprints && <SprintsList sprints={sprints} mode="edit" />}
                  {sprintsPageInfo?.hasNextPage && (
                    <Button
                      alignSelf="center"
                      variant="ghost"
                      onClick={() => sprintsFetchMore()}
                      isDisabled={sprintsLoading}
                    >
                      more
                    </Button>
                  )}
                </Fallback>
              </Stack>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
});

export default Home;
