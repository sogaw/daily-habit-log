import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot } from "firebase-admin/firestore";

type Constructor<T, TData extends DocumentData> = {
  new (id: string, ref: DocumentReference, data: TData): T;
};

export class FireDocument<TData extends DocumentData> {
  constructor(public id: string, public ref: DocumentReference, public data: TData) {}

  static build<T, TData extends DocumentData>(
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

  updateData(data: Partial<TData>) {
    this.data = { ...this.data, ...data };
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
