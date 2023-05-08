/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateHabitInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateSprintInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Habit = {
  __typename?: 'Habit';
  description: Scalars['String'];
  habitRecords: Array<HabitRecord>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tooHard: Scalars['Boolean'];
};

export type HabitRecord = {
  __typename?: 'HabitRecord';
  date: Scalars['String'];
  habitId: Scalars['String'];
  id: Scalars['ID'];
  status: HabitRecordStatus;
};

export enum HabitRecordStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: Habit;
  createSprint: Sprint;
  deleteAccount: Scalars['ID'];
  deleteHabit: Habit;
  deleteSprint: Sprint;
  onboard: User;
  updateHabit: Habit;
  updateHabitRecord: HabitRecord;
  updateProfile: User;
  updateSprint: Sprint;
  updateSprintStatus: Sprint;
};


export type MutationCreateHabitArgs = {
  input: CreateHabitInput;
};


export type MutationCreateSprintArgs = {
  input: CreateSprintInput;
};


export type MutationDeleteHabitArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSprintArgs = {
  id: Scalars['ID'];
};


export type MutationOnboardArgs = {
  input: OnboardInput;
};


export type MutationUpdateHabitArgs = {
  id: Scalars['ID'];
  input: UpdateHabitInput;
};


export type MutationUpdateHabitRecordArgs = {
  input: UpdateHabitRecordInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateSprintArgs = {
  id: Scalars['ID'];
  input: UpdateSprintInput;
};


export type MutationUpdateSprintStatusArgs = {
  id: Scalars['ID'];
  input: UpdateSprintStatusInput;
};

export type OnboardInput = {
  iconPath: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<User>;
};

export type Sprint = {
  __typename?: 'Sprint';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: SprintStatus;
};

export enum SprintStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type UpdateHabitInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateHabitRecordInput = {
  date: Scalars['String'];
  habitId: Scalars['String'];
  status: HabitRecordStatus;
};

export type UpdateProfileInput = {
  iconPath: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateSprintInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateSprintStatusInput = {
  status: SprintStatus;
};

export type User = {
  __typename?: 'User';
  habit: Habit;
  habits: Array<Habit>;
  iconUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sprint: Sprint;
  sprints: Array<Sprint>;
};


export type UserHabitArgs = {
  id: Scalars['ID'];
};


export type UserSprintArgs = {
  id: Scalars['ID'];
};

export type HabitItemFragment = { __typename?: 'Habit', id: string, name: string, description: string, tooHard: boolean, habitRecords: Array<{ __typename?: 'HabitRecord', id: string, date: string, status: HabitRecordStatus, habitId: string }> } & { ' $fragmentName'?: 'HabitItemFragment' };

export type UpdateHabitRecordMutationVariables = Exact<{
  input: UpdateHabitRecordInput;
}>;


export type UpdateHabitRecordMutation = { __typename?: 'Mutation', updateHabitRecord: { __typename?: 'HabitRecord', id: string, date: string, status: HabitRecordStatus, habitId: string } };

export type DeleteHabitMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteHabitMutation = { __typename?: 'Mutation', deleteHabit: { __typename?: 'Habit', id: string } };

export type SprintItemFragment = { __typename?: 'Sprint', id: string, name: string, status: SprintStatus, description: string, createdAt: string } & { ' $fragmentName'?: 'SprintItemFragment' };

export type UpdateSprintStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateSprintStatusInput;
}>;


export type UpdateSprintStatusMutation = { __typename?: 'Mutation', updateSprintStatus: { __typename?: 'Sprint', id: string, status: SprintStatus } };

export type DeleteSprintMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSprintMutation = { __typename?: 'Mutation', deleteSprint: { __typename?: 'Sprint', id: string } };

export type HabitQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type HabitQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, habit: { __typename?: 'Habit', id: string, name: string, description: string } } | null };

export type UpdateHabitMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateHabitInput;
}>;


export type UpdateHabitMutation = { __typename?: 'Mutation', updateHabit: { __typename?: 'Habit', id: string, name: string, description: string } };

export type HabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type HabitsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, habits: Array<(
      { __typename?: 'Habit', id: string }
      & { ' $fragmentRefs'?: { 'HabitItemFragment': HabitItemFragment } }
    )> } | null };

export type CreateHabitMutationVariables = Exact<{
  input: CreateHabitInput;
}>;


export type CreateHabitMutation = { __typename?: 'Mutation', createHabit: (
    { __typename?: 'Habit', id: string }
    & { ' $fragmentRefs'?: { 'HabitItemFragment': HabitItemFragment } }
  ) };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, habits: Array<(
      { __typename?: 'Habit', id: string }
      & { ' $fragmentRefs'?: { 'HabitItemFragment': HabitItemFragment } }
    )>, sprints: Array<(
      { __typename?: 'Sprint', id: string }
      & { ' $fragmentRefs'?: { 'SprintItemFragment': SprintItemFragment } }
    )> } | null };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: string };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'MeFragment': MeFragment } }
  ) };

export type OnboardMutationVariables = Exact<{
  input: OnboardInput;
}>;


export type OnboardMutation = { __typename?: 'Mutation', onboard: { __typename?: 'User', id: string } };

export type SprintQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SprintQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, sprint: { __typename?: 'Sprint', id: string, name: string, description: string } } | null };

export type UpdateSprintMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateSprintInput;
}>;


export type UpdateSprintMutation = { __typename?: 'Mutation', updateSprint: { __typename?: 'Sprint', id: string, name: string, description: string } };

export type SprintsQueryVariables = Exact<{ [key: string]: never; }>;


export type SprintsQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, sprints: Array<(
      { __typename?: 'Sprint', id: string }
      & { ' $fragmentRefs'?: { 'SprintItemFragment': SprintItemFragment } }
    )> } | null };

export type CreateSprintMutationVariables = Exact<{
  input: CreateSprintInput;
}>;


export type CreateSprintMutation = { __typename?: 'Mutation', createSprint: (
    { __typename?: 'Sprint', id: string }
    & { ' $fragmentRefs'?: { 'SprintItemFragment': SprintItemFragment } }
  ) };

export type MeFragment = { __typename?: 'User', id: string, name: string, iconUrl?: string | null } & { ' $fragmentName'?: 'MeFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', viewer?: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'MeFragment': MeFragment } }
  ) | null };

export const HabitItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HabitItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Habit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tooHard"}},{"kind":"Field","name":{"kind":"Name","value":"habitRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"habitId"}}]}}]}}]} as unknown as DocumentNode<HabitItemFragment, unknown>;
export const SprintItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SprintItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sprint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SprintItemFragment, unknown>;
export const MeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<MeFragment, unknown>;
export const UpdateHabitRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHabitRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHabitRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHabitRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"habitId"}}]}}]}}]} as unknown as DocumentNode<UpdateHabitRecordMutation, UpdateHabitRecordMutationVariables>;
export const DeleteHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteHabitMutation, DeleteHabitMutationVariables>;
export const UpdateSprintStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSprintStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSprintStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSprintStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateSprintStatusMutation, UpdateSprintStatusMutationVariables>;
export const DeleteSprintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSprint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSprint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSprintMutation, DeleteSprintMutationVariables>;
export const HabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"habit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"habit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<HabitQuery, HabitQueryVariables>;
export const UpdateHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHabitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateHabitMutation, UpdateHabitMutationVariables>;
export const HabitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"habits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"habits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HabitItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HabitItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Habit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tooHard"}},{"kind":"Field","name":{"kind":"Name","value":"habitRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"habitId"}}]}}]}}]} as unknown as DocumentNode<HabitsQuery, HabitsQueryVariables>;
export const CreateHabitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHabit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHabitInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHabit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HabitItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HabitItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Habit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tooHard"}},{"kind":"Field","name":{"kind":"Name","value":"habitRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"habitId"}}]}}]}}]} as unknown as DocumentNode<CreateHabitMutation, CreateHabitMutationVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"habits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HabitItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sprints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SprintItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HabitItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Habit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"tooHard"}},{"kind":"Field","name":{"kind":"Name","value":"habitRecords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"habitId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SprintItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sprint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"}}]}}]} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const OnboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"onboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<OnboardMutation, OnboardMutationVariables>;
export const SprintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sprint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sprint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<SprintQuery, SprintQueryVariables>;
export const UpdateSprintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSprint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSprintInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSprint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateSprintMutation, UpdateSprintMutationVariables>;
export const SprintsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sprints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sprints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SprintItem"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SprintItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sprint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SprintsQuery, SprintsQueryVariables>;
export const CreateSprintDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSprint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSprintInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSprint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SprintItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SprintItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sprint"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<CreateSprintMutation, CreateSprintMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Me"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Me"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;