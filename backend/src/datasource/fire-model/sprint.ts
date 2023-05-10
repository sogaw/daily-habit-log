import { startOfDay } from "date-fns";
import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { genDate, genId, genTimestamp } from "@/lib/gen";
import { PageInfo } from "@/resolver/object/page-info";
import { SprintConnection } from "@/resolver/object/sprint-connection";
import { SprintEdge } from "@/resolver/object/sprint-edge";

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

  active() {
    const endAt = startOfDay(genDate());
    return this.findManyByQuery((ref) => ref.orderBy("createdAt", "desc").endAt(endAt));
  }

  async paginate({ first, after }: { first: number; after: string }) {
    const afterDateTime = new Date(after);
    const sprints = await this.findManyByQuery((ref) =>
      ref.orderBy("createdAt", "desc").startAfter(afterDateTime).limit(first)
    );
    const edges = sprints.map((sprint) => new SprintEdge(sprint.data.createdAt.toDate().toISOString(), sprint));
    const pageInfo = new PageInfo(edges.length > 0, edges.at(-1)?.cursor);
    return new SprintConnection(edges, pageInfo);
  }
}

export class SprintsCollectionGroup extends FireCollectionGroup<Sprint> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => Sprint.fromSnapshot(snap));
  }
}
