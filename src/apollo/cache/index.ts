import { InMemoryCache } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import isNil from "lodash/isNil";
import { Ref } from "vue";
import { mutations } from "./mutations";
import { typeDefs } from "./typeDefs";
import type { LocalCache, LocalCacheKeys, AppPolicies } from "./types";

const typePolicies: Partial<AppPolicies> = {
  Query: {
    fields: {
      todos: {
        read: (val) => val ?? [],
      },
      queue: {
        read: (val) => val ?? [],
      },
    },
  },
};

export const apolloCache = new InMemoryCache({ typePolicies });

export function useCache<CacheKey extends LocalCacheKeys>(cacheKey: CacheKey) {
  type ApolloResult = Record<CacheKey, LocalCache[CacheKey]>;
  const { result } = useQuery<ApolloResult>(typeDefs[cacheKey], { fetchPolicy: "cache-only" });

  if (isNil(result?.value)) {
    throw new Error("Client query failed, make sure query has correct params");
  }
  return [result as Ref<ApolloResult>, mutations[cacheKey]] as const;
}
