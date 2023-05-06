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
    "\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        name\n        description\n        tooHard\n        habitRecords {\n          id\n          date\n          status\n          habitId\n        }\n      }\n    }\n  }\n": types.HabitsDocument,
    "\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      date\n      status\n      habitId\n    }\n  }\n": types.UpdateHabitRecordDocument,
    "\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n": types.DeleteHabitDocument,
    "\n  mutation deleteAccount {\n    deleteAccount\n  }\n": types.DeleteAccountDocument,
    "\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n": types.OnboardDocument,
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
export function graphql(source: "\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        name\n        description\n        tooHard\n        habitRecords {\n          id\n          date\n          status\n          habitId\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query habits {\n    viewer {\n      id\n      habits {\n        id\n        name\n        description\n        tooHard\n        habitRecords {\n          id\n          date\n          status\n          habitId\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      date\n      status\n      habitId\n    }\n  }\n"): (typeof documents)["\n  mutation updateHabitRecord($input: UpdateHabitRecordInput!) {\n    updateHabitRecord(input: $input) {\n      id\n      date\n      status\n      habitId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteHabit($id: ID!) {\n    deleteHabit(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAccount {\n    deleteAccount\n  }\n"): (typeof documents)["\n  mutation deleteAccount {\n    deleteAccount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      ...Me\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation onboard($input: OnboardInput!) {\n    onboard(input: $input) {\n      id\n    }\n  }\n"];
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