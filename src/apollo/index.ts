import { ApolloClient } from "@apollo/client/core";
import { apolloCache } from "./cache";
import { link } from "./link";

export const apolloClient = new ApolloClient({ link, cache: apolloCache });
