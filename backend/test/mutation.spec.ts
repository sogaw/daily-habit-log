import { Habit, User } from "@/datasource";
import { datasourceContext } from "@/resolver";

import { HabitFactory, HabitRecordFactory, TimestampFactory, UserFactory } from "./factory";
import { clearFirestore, execute, mockGenNow, mockWithAuth } from "./setup";

const { users, habitRecords } = datasourceContext();

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

describe("updateHabitRecord", () => {
  const q = ({
    date,
    status,
    habitId,
  }: {
    date: string;
    status: "SUCCESS" | "FAILED" | "PENDING";
    habitId: string;
  }) => `
    mutation {
      updateHabitRecord(input: { date: "${date}", status: ${status}, habitId: "${habitId}" }) {
        id
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

  it("データとして存在しない場合は、記録を作成するよ", async () => {
    mockGenNow(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q({ date: "2023-01-02", status: "SUCCESS", habitId: "habit-1" }));
    const habitRecord = await habitRecords.findOne(res.data.updateHabitRecord.id);

    expect(habitRecord.data).toMatchObject({
      date: "2023-01-02",
      status: "SUCCESS",
      userId: "user-1",
      habitId: "habit-1",
    });
  });

  it("データとして存在する場合は、記録を更新するよ。当たり前だね", async () => {
    await HabitRecordFactory(habit.habitRecords, null, {
      date: "2023-01-02",
      status: "FAILED",
      userId: "user-1",
      habitId: "habit-1",
    }).save();

    mockGenNow(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q({ date: "2023-01-02", status: "SUCCESS", habitId: "habit-1" }));
    const habitRecord = await habitRecords.findOne(res.data.updateHabitRecord.id);

    expect(habitRecord.data).toMatchObject({
      date: "2023-01-02",
      status: "SUCCESS",
      userId: "user-1",
      habitId: "habit-1",
    });
  });
});
