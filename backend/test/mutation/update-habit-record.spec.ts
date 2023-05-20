import { Habit, User } from "@/datasource";

import { clearDatasource, datasource } from "../datasource-util";
import { HabitFactory, HabitRecordFactory, TimestampFactory, UserFactory } from "../factory";
import { execute, mockGenDate, mockWithAuth } from "../util";

beforeAll(async () => {
  await clearDatasource();
});
afterEach(async () => {
  await clearDatasource;
  jest.clearAllMocks();
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
    me = UserFactory(datasource.users, "user-1", {});
    habit = HabitFactory(me.habits, "habit-1", { createdAt: TimestampFactory("2023-01-01"), userId: me.id });

    await Promise.all([me.save(), habit.save()]);
  });

  it("データとして存在しない場合は、記録を作成するよ", async () => {
    mockGenDate(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q({ date: "2023-01-02", status: "SUCCESS", habitId: "habit-1" }));
    const habitRecord = await datasource.habitRecords.findOne(res.data.updateHabitRecord.id);

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

    mockGenDate(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q({ date: "2023-01-02", status: "SUCCESS", habitId: "habit-1" }));
    const habitRecord = await datasource.habitRecords.findOne(res.data.updateHabitRecord.id);

    expect(habitRecord.data).toMatchObject({
      date: "2023-01-02",
      status: "SUCCESS",
      userId: "user-1",
      habitId: "habit-1",
    });
  });
});
