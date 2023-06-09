import { clearDatasource, datasource } from "@test/datasource-util";
import { execute, mockWithAuth } from "@test/util";

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
    const me = await datasource.users.findOne(res.data.onboard.id);

    expect(me.data).toMatchObject({ id: "user-1", name: "me", iconPath: "" });
  });
});
