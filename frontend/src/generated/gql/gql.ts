/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment HabitItem on Habit {\n    id\n    name\n    description\n    tooHard\n    habitRecords {\n      id\n      ...HabitRecordItem\n    }\n  }\n": types.HabitItemFragmentDoc,
    "\n  fragment HabitRecordItem on HabitRecord {\n    id\n    date\n    status\n    habitId\n  }\n": types.HabitRecordItemFragmentDoc,
    "\n  fragment SprintItem on Sprint {\n    id\n    name\n    status\n    description\n    active\n    createdAt\n    createdOn\n  }\n": types.SprintItemFragmentDoc,
    "\n  fragment TweetItem on Tweet {\n    id\n    content\n    createdAt\n    formattedCreatedAt\n  }\n": types.TweetItemFragmentDoc,
    "\n  mutation deleteAccount {\n    deleteAccount\n  }\n": types.DeleteAccountDocument,
    "\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n": types.OnboardDocument,
    "\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      ...HabitItem\n    }\n  }\n": types.CreateHabitDocument,
    "\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n": types.DeleteHabitDocument,
    "\n  query habit($id: ID!) {\n    viewer {\n      id\n      habit(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.HabitDocument,
    "\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        ...HabitItem\n      }\n    }\n  }\n": types.HabitsDocument,
    "\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      ...HabitRecordItem\n    }\n  }\n": types.UpdateHabitRecordDocument,
    "\n  mutation updateHabit($id: ID!, $input: UpdateHabitInput!) {\n    updateHabit(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.UpdateHabitDocument,
    "\n  mutation createSprint($input: CreateSprintInput!) {\n    createSprint(input: $input) {\n      id\n      ...SprintItem\n    }\n  }\n": types.CreateSprintDocument,
    "\n  mutation deleteAllPastSprints {\n    deleteAllPastSprints {\n      id\n    }\n  }\n": types.DeleteAllPastSprintsDocument,
    "\n  mutation deleteSprint($id: ID!) {\n    deleteSprint(id: $id) {\n      id\n    }\n  }\n": types.DeleteSprintDocument,
    "\n  query sprint($id: ID!) {\n    viewer {\n      id\n      sprint(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n": types.SprintDocument,
    "\n  query sprints($first: Int, $after: String, $filter: SprintsFilter) {\n    viewer {\n      id\n      sprints(first: $first, after: $after, filter: $filter) {\n        edges {\n          cursor\n          node {\n            id\n            ...SprintItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": types.SprintsDocument,
    "\n  mutation updateSprintStatus($id: ID!, $input: UpdateSprintStatusInput!) {\n    updateSprintStatus(id: $id, input: $input) {\n      id\n      status\n    }\n  }\n": types.UpdateSprintStatusDocument,
    "\n  mutation updateSprint($id: ID!, $input: UpdateSprintInput!) {\n    updateSprint(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n": types.UpdateSprintDocument,
    "\n  mutation createTweet($input: CreateTweetInput!) {\n    createTweet(input: $input) {\n      id\n      ...TweetItem\n    }\n  }\n": types.CreateTweetDocument,
    "\n  mutation deleteTweet($id: ID!) {\n    deleteTweet(id: $id) {\n      id\n    }\n  }\n": types.DeleteTweetDocument,
    "\n  query tweets($first: Int, $after: String) {\n    viewer {\n      id\n      tweets(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            ...TweetItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": types.TweetsDocument,
    "\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  fragment Me on User {\n    id\n    name\n    iconUrl\n  }\n": types.MeFragmentDoc,
    "\n  query me {\n    viewer {\n      id\n      ...Me\n    }\n  }\n": types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HabitItem on Habit {\n    id\n    name\n    description\n    tooHard\n    habitRecords {\n      id\n      ...HabitRecordItem\n    }\n  }\n"): (typeof documents)["\n  fragment HabitItem on Habit {\n    id\n    name\n    description\n    tooHard\n    habitRecords {\n      id\n      ...HabitRecordItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HabitRecordItem on HabitRecord {\n    id\n    date\n    status\n    habitId\n  }\n"): (typeof documents)["\n  fragment HabitRecordItem on HabitRecord {\n    id\n    date\n    status\n    habitId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SprintItem on Sprint {\n    id\n    name\n    status\n    description\n    active\n    createdAt\n    createdOn\n  }\n"): (typeof documents)["\n  fragment SprintItem on Sprint {\n    id\n    name\n    status\n    description\n    active\n    createdAt\n    createdOn\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TweetItem on Tweet {\n    id\n    content\n    createdAt\n    formattedCreatedAt\n  }\n"): (typeof documents)["\n  fragment TweetItem on Tweet {\n    id\n    content\n    createdAt\n    formattedCreatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAccount {\n    deleteAccount\n  }\n"): (typeof documents)["\n  mutation deleteAccount {\n    deleteAccount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      ...HabitItem\n    }\n  }\n"): (typeof documents)["\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      ...HabitItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query habit($id: ID!) {\n    viewer {\n      id\n      habit(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query habit($id: ID!) {\n    viewer {\n      id\n      habit(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        ...HabitItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        ...HabitItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      ...HabitRecordItem\n    }\n  }\n"): (typeof documents)["\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      ...HabitRecordItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateHabit($id: ID!, $input: UpdateHabitInput!) {\n    updateHabit(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation updateHabit($id: ID!, $input: UpdateHabitInput!) {\n    updateHabit(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSprint($input: CreateSprintInput!) {\n    createSprint(input: $input) {\n      id\n      ...SprintItem\n    }\n  }\n"): (typeof documents)["\n  mutation createSprint($input: CreateSprintInput!) {\n    createSprint(input: $input) {\n      id\n      ...SprintItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAllPastSprints {\n    deleteAllPastSprints {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteAllPastSprints {\n    deleteAllPastSprints {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSprint($id: ID!) {\n    deleteSprint(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteSprint($id: ID!) {\n    deleteSprint(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sprint($id: ID!) {\n    viewer {\n      id\n      sprint(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query sprint($id: ID!) {\n    viewer {\n      id\n      sprint(id: $id) {\n        id\n        name\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sprints($first: Int, $after: String, $filter: SprintsFilter) {\n    viewer {\n      id\n      sprints(first: $first, after: $after, filter: $filter) {\n        edges {\n          cursor\n          node {\n            id\n            ...SprintItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query sprints($first: Int, $after: String, $filter: SprintsFilter) {\n    viewer {\n      id\n      sprints(first: $first, after: $after, filter: $filter) {\n        edges {\n          cursor\n          node {\n            id\n            ...SprintItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSprintStatus($id: ID!, $input: UpdateSprintStatusInput!) {\n    updateSprintStatus(id: $id, input: $input) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation updateSprintStatus($id: ID!, $input: UpdateSprintStatusInput!) {\n    updateSprintStatus(id: $id, input: $input) {\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSprint($id: ID!, $input: UpdateSprintInput!) {\n    updateSprint(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation updateSprint($id: ID!, $input: UpdateSprintInput!) {\n    updateSprint(id: $id, input: $input) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTweet($input: CreateTweetInput!) {\n    createTweet(input: $input) {\n      id\n      ...TweetItem\n    }\n  }\n"): (typeof documents)["\n  mutation createTweet($input: CreateTweetInput!) {\n    createTweet(input: $input) {\n      id\n      ...TweetItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTweet($id: ID!) {\n    deleteTweet(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTweet($id: ID!) {\n    deleteTweet(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query tweets($first: Int, $after: String) {\n    viewer {\n      id\n      tweets(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            ...TweetItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query tweets($first: Int, $after: String) {\n    viewer {\n      id\n      tweets(first: $first, after: $after) {\n        edges {\n          cursor\n          node {\n            id\n            ...TweetItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Me on User {\n    id\n    name\n    iconUrl\n  }\n"): (typeof documents)["\n  fragment Me on User {\n    id\n    name\n    iconUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    viewer {\n      id\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  query me {\n    viewer {\n      id\n      ...Me\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;