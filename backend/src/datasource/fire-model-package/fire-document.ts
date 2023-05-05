import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";

type Constructor<T, TData extends DocumentData> = {
  new (id: string, ref: DocumentReference, data: TData): T;
};

type FireDocumentObject<TData extends DocumentData> = {
  id: string;
  ref: DocumentReference;
} & TData;

export class FireDocument<TData extends DocumentData> {
  constructor(public id: string, public ref: DocumentReference, public data: TData) {}

  static create<T, TData extends DocumentData>(
    this: Constructor<T, TData>,
    { ref }: { ref: CollectionReference },
    id: string | null,
    data: TData
  ) {
    const docRef = id ? ref.doc(id) : ref.doc();
    return new this(docRef.id, docRef, data);
  }

  static fromSnapshot<T, TData extends DocumentData>(this: Constructor<T, TData>, snapshot: DocumentSnapshot) {
    return new this(snapshot.id, snapshot.ref, snapshot.data() as TData);
  }

  static fromObject<T, TData extends DocumentData>(this: Constructor<T, TData>, object: FireDocumentObject<TData>) {
    const { id, ref, ...data } = object;
    return new this(id, ref, data as unknown as TData);
  }

  update(data: Partial<TData>) {
    this.data = { ...this.data, ...data };
  }

  toObject() {
    return { id: this.id, ref: this.ref, ...this.data };
  }

  toBatchInput() {
    return [this.ref, this.data] as const;
  }

  reload() {
    return this.ref
      .get()
      .then(
        (snapshot) =>
          new (this.constructor as Constructor<this, TData>)(snapshot.id, snapshot.ref, snapshot.data() as TData)
      );
  }

  save() {
    return this.ref.set(this.data);
  }

  destroy() {
    return this.ref.delete();
  }

  recursiveDestroy() {
    return this.ref.firestore.recursiveDelete(this.ref);
  }
}
