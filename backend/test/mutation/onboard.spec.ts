import { clearDatasource } from "../datasource-util";
import { execute, mockWithAuth } from "../util";

beforeAll(async () => {
  await clearDatasource();
});
afterEach(async () => {
  await clearDatasource();
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
