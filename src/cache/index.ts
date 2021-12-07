import { InMemoryCache, FieldPolicy, DocumentNode, gql } from "@apollo/client/core"
import { useQuery } from "@vue/apollo-composable"
import { cloneDeep, isNumber, isObject } from "lodash";
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
    switch (type) {
      case "replaceWith": {
        cache.updateQuery<Cache>({ query }, (data) => {
          if (!data || typeof payload !== 'string') return data
          const cloned = cloneDeep(data)
          cloned.title = payload
          return cloned
        })
        break;
      }
      case "toUpper": {
        cache.updateQuery<Cache>({ query }, (data) => {
          if (!data) return data
          const cloned = cloneDeep(data)
          cloned.title = cloned.title.toUpperCase()
          return cloned
        })
        break;
      }
      default: return
    }
  },
  todos(prop) {
    const { payload, type } = prop
    const query = queries.todos

    switch (type) {
      case "add": {
        cache.updateQuery<Cache>({ query }, (data) => {
          if (!data || !isObject(payload)) return data
          const cloned = cloneDeep(data)
          cloned.todos.push(payload as unknown as Cache['todos'][number])
          return cloned
        })
        break;
      }
      case "remove": {
        cache.updateQuery<Cache>({ query }, (data) => {
          if (!data || !isNumber(payload)) return data
          const cloned = cloneDeep(data)
          cloned.todos = cloned.todos.filter(todo => todo.id !== payload)
          return cloned
        })
        break;
      }
      default: return
    }
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
