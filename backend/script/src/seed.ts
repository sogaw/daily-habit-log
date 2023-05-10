import { auth } from "script/setup";

import { User } from "@/datasource";
import { createDatasourceContext } from "@/resolver";

const datasource = createDatasourceContext();

(async () => {
  const userOne = await auth.getUserByEmail("user-1@example.com").catch(() => undefined);
  if (userOne) return;

  const { uid } = await auth.createUser({ email: "user-1@example.com", password: "Password00", emailVerified: true });
  await User.create(datasource.users, { id: uid, name: "UserOne", iconPath: "" }).save();
})();
