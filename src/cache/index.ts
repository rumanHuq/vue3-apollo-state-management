import { InMemoryCache, FieldPolicy, DocumentNode, gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import Joi, { ValidationResult } from "joi";
import cloneDeep from "lodash/cloneDeep";
import isNil from "lodash/isNil";
import { Ref } from "vue";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
}

type CacheKeys = keyof Cache;
type QueryFn<T> = FieldPolicy<T, T>;
type MutationTypes = {
  todos: "add" | "remove";
  title: "replaceWith" | "toUpper";
};
type Mutations = {
  [key in CacheKeys]: <T = unknown>(action: { actionType: MutationTypes[key]; payload?: T }) => void;
};

export interface Cache {
  todos: Todo[];
  title: string;
}

const TodoSchema = Joi.object<Todo>({
  id: Joi.number().required(),
  completed: Joi.boolean().required(),
  title: Joi.string().required(),
}).required();

const queries: { [key in CacheKeys]: DocumentNode } = {
  todos: gql`
    query getTodos {
      todos
    }
  `,
  title: gql`
    query getTitle {
      title
    }
  `,
};

const fields: { [key in CacheKeys]: QueryFn<Readonly<Cache[key]>> } = {
  todos: {
    read(val) {
      return val ?? [];
    },
  },
  title: {
    read(newVal) {
      return newVal ?? "-";
    },
  },
};

const mutations: Mutations = {
  title(prop) {
    const { payload, actionType } = prop;
    const query = queries.title;
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (actionType) {
        case "replaceWith": {
          if (typeof payload !== "string") return data;
          cache.title = payload;
          break;
        }
        case "toUpper": {
          cache.title = cache.title.toUpperCase();
          break;
        }
        default:
          break;
      }
      return cache;
    });
  },
  todos(prop) {
    const { payload, actionType } = prop;
    const query = queries.todos;
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (actionType) {
        case "add": {
          const { error, value } = TodoSchema.validate(payload);
          if (error) throw error;
          if (!value) return cache;
          cache.todos.push(value);
          return cache;
        }
        case "remove": {
          const { error, value }: ValidationResult<number> = Joi.number().required().validate(payload);
          if (error) throw error;

          cache.todos = cache.todos.filter((todo) => todo.id !== value);
          return cache;
        }
        default:
          return cache;
      }
    });
  },
};

export const cache = new InMemoryCache({
  typePolicies: { Query: { fields } },
});

export function useCache<CacheKey extends CacheKeys>(cacheKey: CacheKey) {
  type ApolloResult = Record<CacheKey, Cache[CacheKey]>;
  const query = queries[cacheKey];
  const { result } = useQuery<ApolloResult>(query, {
    fetchPolicy: "cache-only",
  });
  if (isNil(result?.value)) {
    throw new Error("Client query failed, make sure query has correct params");
  }
  return [result as Ref<ApolloResult>, mutations[cacheKey]] as const;
}
