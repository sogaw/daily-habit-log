import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

initializeApp({
  apiKey: "AIzaSyB8UYrIreCHuV50CBmxmdEwNShNYnPVmZg",
  authDomain: "daily-habit-log.firebaseapp.com",
  projectId: "daily-habit-log",
  storageBucket: "daily-habit-log.appspot.com",
  messagingSenderId: "721377545633",
  appId: "1:721377545633:web:9afddb4d84724926da0fe0",
  measurementId: "G-K7R35NM5NC",
});

if (!import.meta.env.PROD) {
  connectAuthEmulator(getAuth(), "http://localhost:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(getFirestore(), "127.0.0.1", 8080);
  connectStorageEmulator(getStorage(), "127.0.0.1", 9199);
}

if (import.meta.env.PROD) {
  getAnalytics();
}
