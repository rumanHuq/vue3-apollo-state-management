import { FieldPolicy, DocumentNode } from "@apollo/client/core";
import { StrictTypedTypePolicies, TypedTypePolicies } from "@/@types/gql-definitions";

export interface Todo {
  completed: boolean;
  id: number;
  title: string;
}
export interface LocalCache {
  todos: Todo[];
  queue: number[];
}
export type LocalCacheKeys = keyof LocalCache;

type AppFieldPolicy<T> = FieldPolicy<Readonly<T>, Readonly<T>>;
type MutationTypes = {
  todos: "add" | "remove";
  queue: "enqueue" | "dequeue";
};

export type TypeDefs = { [key in LocalCacheKeys]: DocumentNode };

export type Mutations = {
  [key in LocalCacheKeys]: <T>(action: { actionType: MutationTypes[key]; data?: T }) => void;
};

export type LocalCacheFieldPolicies = { [key in LocalCacheKeys]: AppFieldPolicy<LocalCache[key]> };
export interface AppPolicies extends Partial<StrictTypedTypePolicies> {
  Query: TypedTypePolicies["Query"] & {
    fields: LocalCacheFieldPolicies;
  };
}
