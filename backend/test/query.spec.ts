import { Habit, User } from "@/datasource";
import { datasourceContext } from "@/resolver";

import { HabitFactory, TimestampFactory, UserFactory } from "./factory";
import { clearFirestore, execute, mockGenNow, mockGetSignedUrl, mockWithAuth } from "./setup";

const { users } = datasourceContext();

beforeAll(async () => {
  await clearFirestore();
});
beforeEach(() => {
  mockGenNow(new Date());
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

describe("habitRecords", () => {
  const q = () => `
    query {
      viewer {
        habits {
          habitRecords {
            date
            status
          }
        }
      }
    }
  `;

  let me: User;
  let habit: Habit;

  beforeEach(async () => {
    me = UserFactory(users, "user-1", {});
    habit = HabitFactory(me.habits, null, { createdAt: TimestampFactory("2023-01-01"), userId: me.id });

    await Promise.all([me.save(), habit.save()]);
  });

  it("", async () => {
    mockGenNow(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    console.log(JSON.stringify(res, null, 2));
  });
});
