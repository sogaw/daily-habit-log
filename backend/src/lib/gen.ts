import { getFirestore, Timestamp } from "firebase-admin/firestore";

export const genId = () => getFirestore().collection("-").doc().id;
export const genNow = () => new Date();
export const genTimestamp = () => Timestamp.fromDate(genNow());
