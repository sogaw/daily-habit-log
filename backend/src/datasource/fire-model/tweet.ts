import { CollectionGroup, CollectionReference, Timestamp } from "firebase-admin/firestore";

import { genId, genTimestamp } from "@/lib/gen";
import { PageInfo } from "@/resolver/object/page-info";
import { TweetConnection } from "@/resolver/object/tweet-connection";
import { TweetEdge } from "@/resolver/object/tweet-edge";

import { FireCollection, FireCollectionGroup, FireDocument } from "../fire-model-package";

export type TweetData = {
  id: string;
  content: string;
  createdAt: Timestamp;
};

export class Tweet extends FireDocument<TweetData> {
  static create(collection: TweetsCollection, { content }: Pick<TweetData, "content">) {
    const id = genId();
    return this.build(collection, id, { id, content, createdAt: genTimestamp() });
  }
}

export class TweetsCollection extends FireCollection<Tweet> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => Tweet.fromSnapshot(snap));
  }

  async paginate({ first, after }: { first: number; after: string }) {
    const afterDateTime = new Date(after);

    const tweets = await this.findManyByQuery((ref) =>
      ref.orderBy("createdAt", "desc").startAfter(afterDateTime).limit(first)
    );

    const edges = tweets.map((tweet) => new TweetEdge(tweet.data.createdAt.toDate().toISOString(), tweet));
    const pageInfo = new PageInfo(edges.length == first, edges.at(-1)?.cursor);

    return new TweetConnection(edges, pageInfo);
  }
}

export class TweetsCollectionGroup extends FireCollectionGroup<Tweet> {
  constructor(ref: CollectionGroup) {
    super(ref, "id", (snap) => Tweet.fromSnapshot(snap));
  }
}
