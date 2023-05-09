import DataLoader from "dataloader";
import { CollectionGroup, CollectionReference, DocumentData, DocumentSnapshot, Query } from "firebase-admin/firestore";

const createLoader = (ref: CollectionReference) => {
  return new DataLoader<string, DocumentSnapshot>((ids) =>
    Promise.all(
      ids.map(async (id) => {
        const snap = await ref
          .doc(id)
          .get()
          .catch((e) => {
            console.error(e);
            return undefined;
          });
        if (snap?.exists) return snap;
        return new Error("snapshot does not exist");
      })
    )
  );
};

export class FireCollection<TTransformed extends { data: DocumentData }> {
  ref: CollectionReference;
  transformer: (snap: DocumentSnapshot) => TTransformed;
  loader: DataLoader<string, DocumentSnapshot>;

  constructor(ref: CollectionReference, transformer: (snap: DocumentSnapshot) => TTransformed) {
    this.ref = ref;
    this.transformer = transformer;
    this.loader = createLoader(this.ref);
  }

  findOne(id: string, { cache } = { cache: true }) {
    console.debug(`[Fire] read 1 doc from ${this.constructor.name} collection.`);
    return cache ? this.loader.load(id).then(this.transformer) : this.loader.clear(id).load(id).then(this.transformer);
  }

  findOneById(id: string, { cache } = { cache: true }) {
    return this.findOne(id, { cache }).catch(() => undefined);
  }

  async findManyByQuery(queryFn: (ref: CollectionReference) => Query, { prime } = { prime: false }) {
    const snaps = await queryFn(this.ref).get();
    console.debug(`[Fire] read ${snaps.size} docs from ${this.constructor.name} collection.`);
    if (prime) snaps.forEach((snap) => this.loader.prime(snap.id, snap));
    return snaps.docs.map(this.transformer);
  }
}

const createGroupLoader = (ref: CollectionGroup, idField: string) => {
  const loader = new DataLoader<string, DocumentSnapshot>((ids) => {
    return Promise.all(
      ids.map(async (id) => {
        const snaps = await ref
          .where(idField, "==", id)
          .get()
          .then(({ docs }) => docs)
          .catch((e) => {
            console.error(e);
            return [];
          });
        const snap = snaps[0];
        if (snap) return snap;
        return new Error("snapshot does not exist");
      })
    );
  });
  return loader;
};

export class FireCollectionGroup<TTransformed extends { data: DocumentData }> {
  ref: CollectionGroup;
  transformer: (snap: DocumentSnapshot) => TTransformed;
  loader: DataLoader<string, DocumentSnapshot>;

  constructor(
    ref: CollectionGroup,
    idField: keyof TTransformed["data"],
    transformer: (snap: DocumentSnapshot) => TTransformed
  ) {
    this.ref = ref;
    this.transformer = transformer;
    this.loader = createGroupLoader(ref, idField as string);
  }

  findOne(id: string, { cache } = { cache: true }) {
    console.debug(`[Fire] read 1 doc from ${this.constructor.name} collection.`);
    return cache ? this.loader.load(id).then(this.transformer) : this.loader.clear(id).load(id).then(this.transformer);
  }

  findOneById(id: string, { cache } = { cache: true }) {
    return this.findOne(id, { cache }).catch(() => undefined);
  }

  async findManyByQuery(queryFn: (ref: CollectionGroup) => Query, { prime } = { prime: false }) {
    const snaps = await queryFn(this.ref).get();
    console.debug(`[Fire] read ${snaps.size} docs from ${this.constructor.name} collection.`);
    if (prime) snaps.forEach((snap) => this.loader.prime(snap.id, snap));
    return snaps.docs.map(this.transformer);
  }
}
