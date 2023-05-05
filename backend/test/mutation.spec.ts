import { datasourceContext } from "@/resolver";

import { clearFirestore, execute, mockWithAuth, nullable } from "./setup";

const { users } = datasourceContext();

beforeAll(async () => {
  await clearFirestore();
});
afterEach(async () => {
  await clearFirestore();
  users.loader.clearAll();

  jest.clearAllMocks();
});

describe("onboard", () => {
  const q = ({ name, iconPath }: { name: string; iconPath?: string }) => {
    const input = `{ name: "${name}", iconPath: ${nullable(iconPath)} }`;
    return `
      mutation {
        onboard (input: ${input}) {
          id
          name
          iconUrl
        }
      }
    `;
  };

  describe("success", () => {
    it("", async () => {
      mockWithAuth({ uid: "user-1" });

      const res = await execute(q({ name: "me" }));

      expect(res.data.onboard).toMatchObject({ id: "user-1", name: "me", iconUrl: null });
    });
  });
});
