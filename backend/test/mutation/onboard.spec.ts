import { createDatasourceContext } from "@/resolver";

import { clearFirestore, execute, mockWithAuth } from "../util";

const { users } = createDatasourceContext();

beforeAll(async () => {
  await clearFirestore();
});
afterEach(async () => {
  await clearFirestore();
  users.loader.clearAll();

  jest.clearAllMocks();
});

describe("onboard", () => {
  const q = ({ name, iconPath }: { name: string; iconPath: string }) => `
    mutation {
      onboard(input: { name: "${name}", iconPath: "${iconPath}" }) {
        id
        name
        iconUrl
      }
    }
  `;

  it("オンボードできるよ", async () => {
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q({ name: "me", iconPath: "" }));

    expect(res.data.onboard).toMatchObject({ id: "user-1", name: "me", iconUrl: null });
  });
});
