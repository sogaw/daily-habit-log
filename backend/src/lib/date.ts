import { eachDayOfInterval, subMinutes } from "date-fns";
import { Timestamp } from "firebase-admin/firestore";

export const FormatDate = (timestamp: Timestamp) => {
  const d = timestamp.toDate();

  const formatted = new Intl.DateTimeFormat(undefined, {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  })
    .format(d)
    .replace(/,/g, "");

  return formatted;
};

export const AsiaTokyoISO = (date: Date): string => {
  const utc = date.getTime();
  const offset = 9 * 60 * 60 * 1_000;
  return new Date(utc + offset).toISOString().replace(/Z$/, "");
};

export const DateFromISO = (iso: string): string => {
  return iso.split("T")[0];
};

export const fixedEachDayOfInterval = ({ start, end }: { start: Date; end: Date }) => {
  return eachDayOfInterval({ start, end }).map((dateTime) => {
    dateTime = subMinutes(dateTime, dateTime.getTimezoneOffset());
    return dateTime;
  });
};
