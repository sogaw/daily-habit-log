import { clearDatasource, datasource } from "@test/datasource-util";
import { UserFactory } from "@test/factory";
import { execute, mockGetSignedUrl, mockWithAuth } from "@test/util";

beforeAll(async () => {
  await clearDatasource();
});
afterEach(async () => {
  await clearDatasource();
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
    const me = UserFactory(datasource.users, "user-1", { name: "me", iconPath: "users/user-1/icon" });
    const other = UserFactory(datasource.users, "user-2", { name: "other" });

    await Promise.all([me.save(), other.save()]);
  });

  it("ユーザー情報を取得するよ", async () => {
    mockWithAuth({ uid: "user-1" });
    mockGetSignedUrl("https://i.pravatar.cc?img=1");

    const res = await execute(q());

    expect(res.data.viewer).toMatchObject({ id: "user-1", name: "me", iconUrl: "https://i.pravatar.cc?img=1" });
  });
});
