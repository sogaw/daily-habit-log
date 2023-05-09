import { getFirestore, Timestamp } from "firebase-admin/firestore";

export const genId = () => getFirestore().collection("-").doc().id;
export const genDate = () => new Date();
export const genTimestamp = () => Timestamp.fromDate(genDate());
