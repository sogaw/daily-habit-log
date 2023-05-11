import { getStorage, ref } from "firebase/storage";

export const userIconPath = (userId: string) => `users/${userId}/icon`;

export const userIconRef = (userId: string) => ref(getStorage(), userIconPath(userId));
