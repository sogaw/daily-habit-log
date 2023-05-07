import { addMinutes, eachDayOfInterval } from "date-fns";

import { fixedEachDayOfInterval } from "@/lib/date";

it("date-fns の eachDayOfInterval の挙動おかしくないですか？", () => {
  const config = { start: new Date("2023-01-01T00:00Z"), end: new Date("2023-01-02T00:00Z") };
  const offset = new Date().getTimezoneOffset();

  const origin = eachDayOfInterval(config);
  const fixed = fixedEachDayOfInterval(config);

  const originRes = [new Date("2023-01-01T00:00Z"), new Date("2023-01-02T00:00Z")].map((dateTime) =>
    addMinutes(dateTime, offset)
  );
  const fixedRes = [new Date("2023-01-01T00:00Z"), new Date("2023-01-02T00:00Z")];

  expect(origin).toEqual(originRes);
  expect(fixed).toEqual(fixedRes);
});
