import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (process.env.NODE_ENV == "production") {
  initializeApp({
    credential: applicationDefault(),
    storageBucket: "daily-habit-log.appspot.com",
  });
} else if (process.env.NODE_ENV == "development") {
  initializeApp({
    storageBucket: "daily-habit-log.appspot.com",
  });
} else {
  throw new Error("NODE_ENV not specified.");
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
