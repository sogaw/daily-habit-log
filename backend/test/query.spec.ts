import { Habit, User } from "@/datasource";
import { datasourceContext } from "@/resolver";

import { HabitFactory, HabitRecordFactory, TimestampFactory, UserFactory } from "./factory";
import { clearFirestore, execute, mockGenDate, mockGetSignedUrl, mockWithAuth } from "./setup";

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

  it("ユーザー情報を取得する！", async () => {
    mockWithAuth({ uid: "user-1" });
    mockGetSignedUrl("https://i.pravatar.cc?img=1");

    const res = await execute(q());

    expect(res.data.viewer).toMatchObject({ id: "user-1", name: "me", iconUrl: "https://i.pravatar.cc?img=1" });
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
          tooHard
        }
      }
    }
  `;

  let me: User;
  let habit: Habit;

  beforeEach(async () => {
    me = UserFactory(users, "user-1", {});
    habit = HabitFactory(me.habits, "habit-1", { createdAt: TimestampFactory("2023-01-01"), userId: me.id });

    await Promise.all([me.save(), habit.save()]);
  });

  it("データとしては記録は存在しないけど、PENDING として取得できるよ", async () => {
    mockGenDate(new Date("2023-01-01"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].habitRecords).toEqual([{ date: "2023-01-01", status: "PENDING" }]);
  });

  it("存在しているデータは参照されるよ。それ以外は PENDING として返ってくるよ", async () => {
    await Promise.all([
      HabitRecordFactory(habit.habitRecords, null, {
        date: "2023-01-02",
        status: "SUCCESS",
        userId: "user-1",
        habitId: "habit-1",
      }).save(),
    ]);

    mockGenDate(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].habitRecords).toEqual([
      { date: "2023-01-03", status: "PENDING" },
      { date: "2023-01-02", status: "SUCCESS" },
      { date: "2023-01-01", status: "PENDING" },
    ]);
  });

  it("最大で7日分の記録が返ってくるよ", async () => {
    mockGenDate(new Date("2023-01-14"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].habitRecords).toEqual([
      { date: "2023-01-14", status: "PENDING" },
      { date: "2023-01-13", status: "PENDING" },
      { date: "2023-01-12", status: "PENDING" },
      { date: "2023-01-11", status: "PENDING" },
      { date: "2023-01-10", status: "PENDING" },
      { date: "2023-01-09", status: "PENDING" },
      { date: "2023-01-08", status: "PENDING" },
    ]);
  });

  it("4日以内に SUCCESS があれば、tooHard としないよ", async () => {
    await Promise.all([
      HabitRecordFactory(habit.habitRecords, null, {
        date: "2023-01-01",
        status: "SUCCESS",
        userId: "user-1",
        habitId: "habit-1",
      }).save(),
    ]);

    mockGenDate(new Date("2023-01-04"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].tooHard).toEqual(false);
  });

  it("5日以内に SUCCESS がないのであれば、それは tooHard だよ", async () => {
    await Promise.all([
      HabitRecordFactory(habit.habitRecords, null, {
        date: "2023-01-01",
        status: "SUCCESS",
        userId: "user-1",
        habitId: "habit-1",
      }).save(),
    ]);

    mockGenDate(new Date("2023-01-05"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].tooHard).toEqual(true);
  });
});
