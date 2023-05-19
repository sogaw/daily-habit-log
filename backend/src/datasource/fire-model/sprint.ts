import { startOfDay } from "date-fns";
import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { genDate, genId, genTimestamp } from "@/lib/gen";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";

export type SprintData = {
  id: string;
  name: string;
  description: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
};

export class Sprint extends FireDocument<SprintData> {
  static create(
    collection: SprintsCollection,
    { name, description, userId }: Pick<SprintData, "name" | "description" | "userId">
  ) {
    const id = genId();
    const now = genTimestamp();
    return this.build(collection, id, {
      id,
      name,
      description,
      status: "PENDING",
      createdAt: now,
      updatedAt: now,
      userId,
    });
  }

  update({ name, description }: Pick<SprintData, "name" | "description">) {
    return this.updateData({ name, description, updatedAt: genTimestamp() });
  }

  updateStatus({ status }: Pick<SprintData, "status">) {
    return this.updateData({ status, updatedAt: genTimestamp() });
  }
}

export class SprintsCollection extends FireCollection<Sprint> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => Sprint.fromSnapshot(snap));
  }

  async paginate({ first, after, filter }: { first: number; after: string; filter: "TODAY" | "ALL" }) {
    const afterDateTime = new Date(after);

    const sprints = await this.findManyByQuery((ref) => {
      let res = ref.orderBy("createdAt", "desc").startAfter(afterDateTime);
      if (filter == "TODAY") {
        const today = startOfDay(genDate());
        res = res.endAt(today);
      }
      return res.limit(first);
    });

    return sprints;
  }

  async past() {
    const today = startOfDay(genDate());

    const pastSprints = await this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").startAt(today));

    return pastSprints;
  }
}

export class SprintsCollectionGroup extends FireCollectionGroup<Sprint> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => Sprint.fromSnapshot(snap));
  }
}
