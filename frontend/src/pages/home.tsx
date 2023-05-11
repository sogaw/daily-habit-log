import { Box, Button, Container, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { Fallback } from "@/components/Fallback";
import { HabitsList } from "@/components/habit/HabitsList";
import { Layout } from "@/components/Layout";
import { SprintsList } from "@/components/sprint/SprintsList";
import { Guard } from "@/hocs/guard";
import { useHabits } from "@/hooks/habit/use-habits";
import { useSprints } from "@/hooks/sprint/use-sprints";

const queryOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "All",
    value: "all",
  },
];

const Home = Guard("AfterOnboard", () => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useLocalStorage("daily-habit-log.home.tab", 0);

  const { habits, loading: habitsLoading, error: habitsError } = useHabits({ skip: tabIndex != 0 });

  const {
    sprints,
    pageInfo: sprintsPageInfo,
    loading: sprintsLoading,
    error: sprintsError,
    fetchMore: sprintsFetchMore,
  } = useSprints({ skip: tabIndex != 1 });

  return (
    <Layout width="full">
      <Tabs h="full" display="flex" flexDirection="column" defaultIndex={tabIndex} onChange={setTabIndex}>
        <Container>
          <TabList>
            <Tab fontWeight="semibold">Habits</Tab>
            <Tab fontWeight="semibold">Sprints</Tab>
          </TabList>
        </Container>

        <Box flex="1" position="relative">
          <Box position="absolute" inset="0" overflowY="auto">
            <Container>
              <TabPanels>
                <TabPanel px="2">
                  <Fallback loading={habitsLoading} error={habitsError}>
                    {habits && (
                      <Stack spacing="4">
                        <Flex justify="space-between" align="center">
                          <Box w="32">
                            <Select size="sm" defaultValue={queryOptions[0]} options={queryOptions} />
                          </Box>

                          <Button alignSelf="end" size="sm" colorScheme="green" onClick={() => navigate("/habits/new")}>
                            New habit
                          </Button>
                        </Flex>

                        <HabitsList habits={habits} mode="edit" />
                      </Stack>
                    )}
                  </Fallback>
                </TabPanel>

                <TabPanel px="2">
                  <Fallback loading={sprintsLoading} error={sprintsError}>
                    {sprints && (
                      <Stack spacing="4">
                        <Flex justify="space-between" align="center">
                          <Box w="32">
                            <Select size="sm" defaultValue={queryOptions[0]} options={queryOptions} />
                          </Box>

                          <Button
                            alignSelf="end"
                            size="sm"
                            colorScheme="green"
                            onClick={() => navigate("/sprints/new")}
                          >
                            New sprint
                          </Button>
                        </Flex>

                        <Stack>
                          <SprintsList sprints={sprints} mode="edit" />
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
                        </Stack>
                      </Stack>
                    )}
                  </Fallback>
                </TabPanel>
              </TabPanels>
            </Container>
          </Box>
        </Box>
      </Tabs>
    </Layout>
  );
});

export default Home;
