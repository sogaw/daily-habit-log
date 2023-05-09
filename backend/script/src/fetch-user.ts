import { db } from "../setup";

(async () => {
  const users = await db
    .collection("users")
    .get()
    .then((snap) => snap.docs.map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() })));

  console.log(users);
})();
