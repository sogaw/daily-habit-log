import { Sprint } from "@/datasource/fire-model/sprint";
import { datasourceContext } from "@/resolver";

const datasource = datasourceContext();

(async () => {
  const users = await datasource.users.findManyByQuery((ref) => ref);
  for (const user of users) {
    for (let i = 0; i < 100; i++) {
      await Sprint.create(user.sprints, { name: `sprint-${i}`, description: "", userId: user.id }).save();
    }
  }
})();
