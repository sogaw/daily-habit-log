import { datasourceContext } from "@/resolver";

const datasource = datasourceContext();

(async () => {
  const users = await datasource.users.findManyByQuery((ref) => ref);
  for (const user of users) {
    const habits = await user.habits.findManyByQuery((ref) => ref);
    const sprints = await user.sprints.findManyByQuery((ref) => ref);
    await Promise.all(habits.map((habit) => habit.recursiveDestroy()));
    await Promise.all(sprints.map((sprint) => sprint.recursiveDestroy()));
  }
})();
