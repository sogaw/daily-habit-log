import { Habit, User } from "@/datasource";

import { clearDatasource, datasource } from "../datasource-util";
import { HabitFactory, HabitRecordFactory, TimestampFactory, UserFactory } from "../factory";
import { execute, mockGenDate, mockWithAuth } from "../util";

beforeAll(async () => {
  await clearDatasource();
});
afterEach(async () => {
  await clearDatasource();
  jest.clearAllMocks();
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
    me = UserFactory(datasource.users, "user-1", {});
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

  it("最大で5日分の記録が返ってくるよ", async () => {
    mockGenDate(new Date("2023-01-14"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].habitRecords).toEqual([
      { date: "2023-01-14", status: "PENDING" },
      { date: "2023-01-13", status: "PENDING" },
      { date: "2023-01-12", status: "PENDING" },
      { date: "2023-01-11", status: "PENDING" },
      { date: "2023-01-10", status: "PENDING" },
    ]);
  });

  it("作成後2日以内は、tooHard としないよ", async () => {
    mockGenDate(new Date("2023-01-02"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].tooHard).toEqual(false);
  });

  it("作成後3日以降は直近3日以内に SUCCESS が1つもなければ、tooHard とするよ", async () => {
    mockGenDate(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].tooHard).toEqual(true);
  });

  it("作成後3日以降は直近3日以内に SUCCESS が1つもなければ、tooHard とするよ。つまり、4日前に SUCCESS があっても、tooHard だよ", async () => {
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

    expect(res.data.viewer.habits[0].tooHard).toEqual(true);
  });

  it("作成後3日以降で直近3日以内に SUCCESS が1つあれば、tooHard としないよ", async () => {
    await Promise.all([
      HabitRecordFactory(habit.habitRecords, null, {
        date: "2023-01-01",
        status: "SUCCESS",
        userId: "user-1",
        habitId: "habit-1",
      }).save(),
    ]);

    mockGenDate(new Date("2023-01-03"));
    mockWithAuth({ uid: "user-1" });

    const res = await execute(q());

    expect(res.data.viewer.habits[0].tooHard).toEqual(false);
  });
});
