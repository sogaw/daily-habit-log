import { CollectionReference, getFirestore, Timestamp } from "firebase-admin/firestore";

import { FireCollection, FireDocument } from "../fire-model-package";

/**
 * Firestore structure
 *
 * /users/${userId}
 *
 */

/**
 * Util
 */
export const genId = () => getFirestore().collection("-").doc().id;
export const genTimestamp = () => Timestamp.now();

/**
 * Document
 */
export type UserData = {
  id: string;
  name: string;
  iconPath: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class User extends FireDocument<UserData> {}

/**
 * Collection
 */
export class UsersCollection extends FireCollection<User> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => User.fromSnapshot(snap));
  }
}

/**
 * Collection Group
 */
