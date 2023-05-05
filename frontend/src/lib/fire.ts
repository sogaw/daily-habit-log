import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

initializeApp({
  apiKey: "AIzaSyAG2HdQcDgmOhlSljZ6aSO4VrbONlaxnng",
  authDomain: "fire-gql-template.firebaseapp.com",
  projectId: "fire-gql-template",
  storageBucket: "fire-gql-template.appspot.com",
  messagingSenderId: "551203617339",
  appId: "1:551203617339:web:27c5c65f898decb2507a1e",
  measurementId: "G-ZLMJSQB24H",
});

if (!import.meta.env.PROD) {
  connectAuthEmulator(getAuth(), "http://localhost:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(getFirestore(), "127.0.0.1", 8080);
  connectStorageEmulator(getStorage(), "127.0.0.1", 9199);
}
