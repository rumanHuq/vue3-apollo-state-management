import { InMemoryCache, FieldPolicy, DocumentNode, gql } from "@apollo/client/core"
import { useQuery } from "@vue/apollo-composable"
import { cloneDeep, isArray, isNumber, isObject } from "lodash";
import { Ref } from "vue";

interface Todo {
  completed: boolean;
  id: number;
  title: string
}

export interface Cache {
  todos: Todo[]
  title: string
}

type CacheKeys = keyof Cache
type QueryFn<T> = FieldPolicy<T, T>
type Mutations = {
  todos: {
    Type: "add" | "remove"
  }
  title: {
    Type: "replaceWith" | "toUpper"
  }

}
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
  `
}

const initialCache: { [key in CacheKeys]: QueryFn<Readonly<Cache[key]>> } = {
  todos: {
    read(val) {
      return val ?? []
    }
  },
  title: {
    read(newVal) {
      return newVal ?? "-"
    }
  }
}

const mutations: { [key in CacheKeys]: <T extends unknown = undefined>(prop: { type: Mutations[key]["Type"], payload?: T }) => void } = {
  title(prop) {
    const { payload, type } = prop
    const query = queries.title
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data
      const cloned = cloneDeep(data)
      switch (type) {
        case "replaceWith": {
          if (typeof payload !== 'string') return data
          cloned.title = payload
          return cloned
        }
        case "toUpper": {
          cloned.title = cloned.title.toUpperCase()
          return cloned
        }
        default: return cloned
      }
    })
  },
  todos(prop) {
    const { payload, type } = prop
    const query = queries.todos
    cache.updateQuery<Cache>({ query }, (data) => {
      if (!data) return data
      const cloned = cloneDeep(data)
      switch (type) {
        case "add": {
          if (isArray(payload) && !isObject(payload)) return cloned
          cloned.todos.push(payload as unknown as Cache['todos'][number])
          return cloned
        }
        case "remove": {
          if (!isNumber(payload)) return cloned
          cloned.todos = cloned.todos.filter(todo => todo.id !== payload)
          return cloned
        }
        default: return cloned
      }
    })
  },
}

export const cache = new InMemoryCache({
  typePolicies: { Query: { fields: initialCache } }
})

export function useCache<CacheKey extends CacheKeys>(cacheKey: CacheKey) {
  const query = queries[cacheKey]
  const { result } = useQuery<Record<CacheKey, Cache[CacheKey]>>(query, { fetchPolicy: 'cache-only' })
  if (!result.value) {
    throw new Error('Client query failed, make sure query has correct params')
  }
  type ApolloResult = Ref<Record<CacheKey, Cache[CacheKey]>>
  return [result as ApolloResult, mutations[cacheKey]] as const
}
