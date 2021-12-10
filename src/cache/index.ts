import { InMemoryCache, FieldPolicy, DocumentNode, gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import Joi, { ValidationResult } from "joi";
import cloneDeep from "lodash/cloneDeep";
import { Ref } from "vue";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
}

export interface Cache {
  todos: Todo[];
  title: string;
}

const TodoSchema = Joi.object<Todo>({
  id: Joi.number().required(),
  completed: Joi.boolean().required(),
  title: Joi.string().required(),
}).required();

type CacheKeys = keyof Cache;
type QueryFn<T> = FieldPolicy<T, T>;
type MutationTypes = {
  todos: "add" | "remove";
  title: "replaceWith" | "toUpper";
};
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

const initialCache: { [key in CacheKeys]: QueryFn<Readonly<Cache[key]>> } = {
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

const mutations: {
  [key in CacheKeys]: <T = undefined>(prop: { type: MutationTypes[key]; payload?: T }) => void;
} = {
  title(prop) {
    const { payload, type } = prop;
    const query = queries.title;
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (type) {
        case "replaceWith": {
          if (typeof payload !== "string") return data;
          cache.title = payload;
          return cache;
        }
        case "toUpper": {
          cache.title = cache.title.toUpperCase();
          return cache;
        }
        default:
          return cache;
      }
    });
  },
  todos(prop) {
    const { payload, type } = prop;
    const query = queries.todos;
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data;
      const cache = cloneDeep(data);
      switch (type) {
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
          if (!value) return cache;

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
  typePolicies: { Query: { fields: initialCache } },
});

export function useCache<CacheKey extends CacheKeys>(cacheKey: CacheKey) {
  const query = queries[cacheKey];
  const { result } = useQuery<Record<CacheKey, Cache[CacheKey]>>(query, {
    fetchPolicy: "cache-only",
  });
  if (!result.value) {
    throw new Error("Client query failed, make sure query has correct params");
  }
  type ApolloResult = Ref<Record<CacheKey, Cache[CacheKey]>>;
  return [result as ApolloResult, mutations[cacheKey]] as const;
}
