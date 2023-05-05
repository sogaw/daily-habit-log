import { datasourceContext } from "@/resolver";

import { UserFactory } from "./factory";
import { clearFirestore, execute, mockGetSignedUrl, mockWithAuth } from "./setup";

const { users } = datasourceContext();

beforeAll(async () => {
  await clearFirestore();
});
afterEach(async () => {
  await clearFirestore();
  users.loader.clearAll();

  jest.clearAllMocks();
});

describe("viewer", () => {
  const q = () => `
    query {
      viewer {
        id
        name
        iconUrl
      }
    }
  `;

  beforeEach(async () => {
    const me = UserFactory(users, "user-1", { name: "me", iconPath: "users/user-1/icon" });
    const other = UserFactory(users, "user-2", { name: "other" });

    await Promise.all([me.save(), other.save()]);
  });

  describe("success", () => {
    it("", async () => {
      mockWithAuth({ uid: "user-1" });
      mockGetSignedUrl("https://i.pravatar.cc?img=1");

      const res = await execute(q());

      expect(res.data.viewer).toMatchObject({ id: "user-1", name: "me", iconUrl: "https://i.pravatar.cc?img=1" });
    });
  });
});
